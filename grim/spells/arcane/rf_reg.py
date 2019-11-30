import pandas as pd, numpy as np
import sys, argparse, logging
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor  # get the model
from sklearn import linear_model
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import RandomizedSearchCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.svm import SVR
from sklearn.model_selection import GridSearchCV
import sklearn.metrics
import pickle
import random


def spell(spell_inputs):
    healed_data = spell_inputs["healed_data"]
    print("rf_reg")

    # Random hyper parms
    tuned = {}
    tuned["min_samples_leaf"] = 2
    tuned["max_features"] = "sqrt"
    tuned["bootstrap"] = True
    tuned["n_estimators"] = 1000
    tuned["max_depth"] = 150
    tuned["min_samples_split"] = 2

    randInt = random.randint(1, 200)

    rf = RandomForestRegressor(
        n_estimators=tuned["n_estimators"],
        max_features=tuned["max_features"],
        max_depth=tuned["max_depth"],
        min_samples_split=tuned["min_samples_split"],
        bootstrap=tuned["bootstrap"],
        min_samples_leaf=tuned["min_samples_leaf"],
        random_state=randInt,
    )

    print(healed_data)


    # train the model!!!!
    train_features = healed_data["train_features"]
    train_target = healed_data["train_target"]
    test_target = healed_data["test_target"]


    test_features = healed_data["test_features"]
    feature_list = healed_data["feature_list"]
    featuresarr = healed_data["features_arr"]
    target = healed_data["target"]
    target_string = healed_data["target_string"]
    raw_data = healed_data["mana"]


    logging.debug("Heres model data")

    logging.debug(str(healed_data))

    logging.debug("Running training with these hyperparms: " + str(tuned))

    rf.fit(healed_data["train_features"], healed_data["train_target"])

    # save model output
    model_output_loc = target_string+"rf_reg_model.pkl"
    model_output = open(model_output_loc, "wb")
    pickle.dump(rf, model_output)
    model_output.close()    

    #should cut off here and make new spell for metrics? or have it return a metrics field to caputre run
    #model
    #model save loc
    #metrics

    predictions = rf.predict(test_features)
    print("Predictions:", predictions)
    print("True Values", test_target)


    errors = abs(predictions - test_target)
    print("Errors", errors)
    # run_output += 'Errors', errors+"\n"
    print("The RF Models Mean Absolute Error: ", round(np.mean(errors), 2))
    # run_output += 'The RF Models Mean Absolute Error: ', round(np.mean(errors), 2)+"\n"

    # Calculate mean absolute percentage error (MAPE)
    mape = 100 * (errors / test_target)

    # Calculate and display accuracy
    accuracy = 100 - np.mean(abs(mape))
    print("Accuracy:", round(accuracy, 2), "%.")
    # run_output += 'Accuracy:', round(accuracy, 2), '%.'+"\n"
    np.set_printoptions(suppress=True)
    print("MAPE:", mape)
    # run_output += print('MAPE:', mape)+"\n"

    # Get numerical feature importances
    importances = list(rf.feature_importances_)
    importances2 = rf.feature_importances_  # used later for graph
    # List of tuples with variable and importance
    feature_importances = [
        (feature, round(importance, 2))
        for feature, importance in zip(feature_list, importances)
    ]

    # Sort the feature importances by most important first
    feature_importances = sorted(
        feature_importances, key=lambda x: x[1], reverse=True
    )  # print out the feature and importances

    [
        print("Variable: {:20} Importance: {}".format(*pair))
        for pair in feature_importances
    ]

    predictions = rf.predict(featuresarr)
    true = target

    r2 = r2_score(true, predictions)
    mse = mean_squared_error(true, predictions)
    rmse = np.sqrt(mean_squared_error(true, predictions))
    print("R^2 = %.3f" % r2)
    print("MSE = %.3f" % mse)
    print("RMSE = %.3f" % rmse)

    return rf