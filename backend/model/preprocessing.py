
import pandas as pd


from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from xgboost import XGBClassifier, XGBRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split,cross_val_score
from sklearn.preprocessing import StandardScaler ,OneHotEncoder,OrdinalEncoder,FunctionTransformer
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.metrics import accuracy_score,mean_squared_error,r2_score
from sklearn.impute import SimpleImputer

from sklearn.preprocessing import (
    StandardScaler,
    OneHotEncoder,
    OrdinalEncoder
)

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    mean_squared_error,
    mean_absolute_error,
    r2_score
)

import numpy as np

def handle_datetime(df):

    df = df.copy()

    datetime_col = df.select_dtypes(
        include=["datetime64[ns]","datetime64"]
    ).columns

    # object type me hidden datetime detect karne ke liye
    for col in df.columns:

        if df[col].dtype == "object":

            try:

                converted = pd.to_datetime(
                    df[col],
                    errors="raise"
                )

                df[col] = converted

                datetime_col = datetime_col.union([col])

            except:
                pass

    # datetime split
    for col in datetime_col:

        df[f"{col}_year"] = df[col].dt.year

        df[f"{col}_month"] = df[col].dt.month

        df[f"{col}_day"] = df[col].dt.day

        df[f"{col}_dayofweek"] = df[col].dt.dayofweek

        df.drop(col,axis=1,inplace=True)

    return df


def model_train(df, tar, model_name, model_type):
    temp_df = handle_datetime(df.copy())
    temp_df = proper_format(temp_df)
    temp_df=temp_df.drop(tar,axis=1)



    datetime=FunctionTransformer(handle_datetime,validate=False)
    format=FunctionTransformer(proper_format,validate=False)


    x_train, x_test, ytrain, ytest = train_test_split(
        df.drop(tar, axis=1),
        df[tar],
        test_size=0.2,
        random_state=42
    )

    num_col = temp_df.select_dtypes(include="number").columns
    cat_col = temp_df.select_dtypes(exclude="number").columns


    # Numerical pipeline
    num_pipe = Pipeline([
        ("imputer", SimpleImputer(
            strategy="median",
            add_indicator=True
        )),
        ("scaler", StandardScaler())
    ])

    label_enc = []
    one_hot = []

    for col in cat_col:

        if temp_df[col].nunique() > 9:
            label_enc.append(col)

        else:
            one_hot.append(col)


    label = Pipeline([
        ("imputer", SimpleImputer(
            strategy="most_frequent",

        )),
        ("label", OrdinalEncoder(
            handle_unknown="use_encoded_value",
            unknown_value=-1
        ))
    ])


    one = Pipeline([
        ("imputer", SimpleImputer(
            strategy="most_frequent",

        )),
        ("one_hot", OneHotEncoder(
            handle_unknown="ignore",
            drop="first"
        ))
    ])

    trf1 = ColumnTransformer([
        ("num", num_pipe, num_col),
        ("label", label, label_enc),
        ("one", one, one_hot)

    ], remainder="passthrough")

    pipe = Pipeline([
        ("datetime",datetime),
        ("format",format),
        ("trf1", trf1),
        ("model", model_name)
    ])

    model = pipe.fit(x_train, ytrain)

    y_pred = model.predict(x_test)

    result = {"model": model}

    # Regression
    if model_type == "regression_model":

        result["MAE"] = mean_absolute_error(
            ytest,
            y_pred
        )

        result["MSE"] = mean_squared_error(
            ytest,
            y_pred
        )

        result["RMSE"] = np.sqrt(
            mean_squared_error(ytest, y_pred)
        )

        result["R2_SCORE"] = r2_score(
            ytest,
            y_pred
        )

        cv = cross_val_score(
            pipe,
            df.drop(tar, axis=1),
            df[tar],
            cv=5,
            scoring="r2"
        )

        result["CV_MEAN_SCORE"] = cv.mean()

    # Classification
    else:

        result["ACCURACY"] = accuracy_score(
            ytest,
            y_pred
        )

        result["PRECISION"] = precision_score(
            ytest,
            y_pred,
            average="weighted"
        )

        result["RECALL"] = recall_score(
            ytest,
            y_pred,
            average="weighted"
        )

        result["F1_SCORE"] = f1_score(
            ytest,
            y_pred,
            average="weighted"
        )

        cv = cross_val_score(
            pipe,
            df.drop(tar, axis=1),
            df[tar],
            cv=5,
            scoring="accuracy"
        )

        result["CV_MEAN_SCORE"] = cv.mean()

    return result



def proper_format(df):

   cat_col = df.select_dtypes(exclude="number").columns
   for col in cat_col:
       df[col] = df[col].astype(str).str.strip().str.title()

   return df

