from sklearn.linear_model import LogisticRegression, LinearRegression
from sklearn.tree import (
    DecisionTreeClassifier,
    DecisionTreeRegressor
)
from sklearn.ensemble import (
    RandomForestClassifier,
    RandomForestRegressor
)

from xgboost import XGBClassifier, XGBRegressor


# Binary Classification Models
logistic_model = {

    "logisticregression": LogisticRegression ,

    "decisiontreeclassifier": DecisionTreeClassifier,

    "randomforestclassifier": RandomForestClassifier,

    "xgbclassifier": XGBClassifier 
}


# Multiclass Classification Models
softmax_model = {

    "multinomiallogisticregression": LogisticRegression ,

    "decisiontreeclassifier": DecisionTreeClassifier,

    "randomforestclassifier": RandomForestClassifier ,

    "xgbclassifier": XGBClassifier 
}


# Regression Models
regression_model = {

    "linearregression": LinearRegression,

    "decisiontreeregressor": DecisionTreeRegressor,

    "randomforestregressor": RandomForestRegressor ,

    "xgbregressor": XGBRegressor 
}

models = {
    "logistic_model": logistic_model,
    "softmax_model": softmax_model,
    "regression_model": regression_model
}

# Hyperparameter Grids

param_grids = {

    # =========================
    # Binary Classification
    # =========================
    "logistic_model": {

        "logisticregression": {
            "solver": ["lbfgs", "sag", "saga", "newton-cg"],
            "C": [0.01, 0.1, 1, 10],
            "penalty": ["l2"],
            "max_iter": [100, 300, 500]
        },

        "decisiontreeclassifier": {
            "criterion": ["gini", "entropy"],
            "max_depth": [None, 5, 10, 20],
            "min_samples_split": [2, 5, 10],
            "min_samples_leaf": [1, 2, 4]
        },

        "randomforestclassifier": {
            "n_estimators": [100, 200, 300],
            "criterion": ["gini", "entropy"],
            "max_depth": [None, 10, 20],
            "min_samples_split": [2, 5],
            "min_samples_leaf": [1, 2],
            "max_features": ["sqrt", "log2"]
        },

        "xgbclassifier": {
            "n_estimators": [100, 200],
            "learning_rate": [0.01, 0.1, 0.2],
            "max_depth": [3, 5, 7],
            "subsample": [0.8, 1.0],
            "colsample_bytree": [0.8, 1.0]
        }
    },


    # =========================
    # Multiclass Classification
    # =========================
    "softmax_model": {

        "multinomiallogisticregression": {
            "solver": ["lbfgs", "sag", "saga", "newton-cg"],
            "C": [0.01, 0.1, 1, 10],
            "penalty": ["l2"],
            "max_iter": [100, 300, 500],
            "multi_class": ["multinomial"]
        },

        "decisiontreeclassifier": {
            "criterion": ["gini", "entropy"],
            "max_depth": [None, 5, 10, 20],
            "min_samples_split": [2, 5, 10],
            "min_samples_leaf": [1, 2, 4]
        },

        "randomforestclassifier": {
            "n_estimators": [100, 200, 300],
            "criterion": ["gini", "entropy"],
            "max_depth": [None, 10, 20],
            "min_samples_split": [2, 5],
            "min_samples_leaf": [1, 2],
            "max_features": ["sqrt", "log2"]
        },

        "xgbclassifier": {
            "n_estimators": [100, 200],
            "learning_rate": [0.01, 0.1, 0.2],
            "max_depth": [3, 5, 7],
            "subsample": [0.8, 1.0],
            "colsample_bytree": [0.8, 1.0]
        }
    },


    # =========================
    # Regression
    # =========================
    "regression_model": {

        "linearregression": {
            "fit_intercept": [True, False]
        },

        "decisiontreeregressor": {
            "criterion": ["squared_error", "friedman_mse"],
            "max_depth": [None, 5, 10, 20],
            "min_samples_split": [2, 5, 10],
            "min_samples_leaf": [1, 2, 4]
        },

        "randomforestregressor": {
            "n_estimators": [100, 200, 300],
            "max_depth": [None, 10, 20],
            "min_samples_split": [2, 5],
            "min_samples_leaf": [1, 2],
            "max_features": ["sqrt", "log2"]
        },

        "xgbregressor": {
            "n_estimators": [100, 200],
            "learning_rate": [0.01, 0.1, 0.2],
            "max_depth": [3, 5, 7],
            "subsample": [0.8, 1.0],
            "colsample_bytree": [0.8, 1.0]
        }
    }
}