import pandas as pd

from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from xgboost import XGBClassifier, XGBRegressor
from sklearn.tree import DecisionTreeRegressor
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression


# Binary Classification Models
# Binary Classification Models
logistic_model = {

    "LogisticRegression": """LogisticRegression(
        solver='lbfgs'
    )""",

    "DecisionTreeClassifier": """DecisionTreeClassifier()""",

    "RandomForestClassifier": """RandomForestClassifier(
        n_estimators=100
    )""",

    "XGBClassifier": """XGBClassifier(
        objective='binary:logistic'
    )"""
}

# Multiclass Classification Models
softmax_model = {

    "MultinomialLogisticRegression": """LogisticRegression(
        solver='lbfgs'
    )""",

    "DecisionTreeClassifier": """DecisionTreeClassifier()""",

    "RandomForestClassifier": """RandomForestClassifier(
        n_estimators=100
    )""",

    "XGBClassifier": """XGBClassifier(
        objective="multi:softprob",
        num_class=3
    )"""
}

# Regression Models
regression_model = {

    "LinearRegression": """LinearRegression()""",

    "DecisionTreeRegressor": """DecisionTreeRegressor()""",

    "RandomForestRegressor": """RandomForestRegressor(
        n_estimators=100
    )""",

    "XGBRegressor": """XGBRegressor(
        objective='reg:squarederror'
    )"""
}
def select_model(df: pd.DataFrame, target: str):
    target=target.strip().lower()
    columns=df.columns
    lower_columns=[col.strip().lower() for col in columns]


    if target not in lower_columns:
        raise ValueError(f"Target column '{target}' not found in the DataFrame.")
    indx=lower_columns.index(target)
    target=columns[indx]
    
    if df[target].nunique()==2:

        return {"type": "logistic_model", "models": logistic_model}
    
    if df[target].nunique()>2 and df[target].nunique()<=10:
        return {"type": "softmax_model", "models": softmax_model}

    return {"type": "regression_model", "models": regression_model}




        