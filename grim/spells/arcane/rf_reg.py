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
import streamlit as st
import altair as alt






def spell(spell_inputs):
  
    print("rf_reg heal data")

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

    # train the model!!!!
    #wait for key?
    print("Heres model data")
    healed_data = spell_inputs["healed_data"]

    print(str(healed_data))
    train_features = healed_data["train_features"]
    train_target = healed_data["train_target"]
    test_target = healed_data["test_target"]


    test_features = healed_data["test_features"]
    feature_list = healed_data["feature_list"]
    featuresarr = healed_data["features_arr"]
    target = healed_data["target"]
    target_string = healed_data["target_string"]
    raw_data = healed_data["mana"]



    #should check if model exists, if it does load model
    logging.debug("Running training with these hyperparms: " + str(tuned))

    rf.fit(healed_data["train_features"], healed_data["train_target"])

    # save model output
    model_output_loc = target_string+"rf_reg_model.pkl"
    # model_output = open(model_output_loc, "wb")
    # pickle.dump(rf, model_output)
    # model_output.close()    

    #should cut off here and make new spell for metrics? or have it return a metrics field to caputre run
    #model
    #timestamp
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

    # [
    #     print("Variable: {:20} Importance: {}".format(*pair))
    #     for pair in feature_importances
    # ]

    predictions = rf.predict(featuresarr)
    true = target

    r2 = r2_score(true, predictions)
    mse = mean_squared_error(true, predictions)
    rmse = np.sqrt(mean_squared_error(true, predictions))
    print("R^2 = %.3f" % r2)
    print("MSE = %.3f" % mse)
    print("RMSE = %.3f" % rmse)

    jsonOutput ={}
    jsonOutput["model_location"] = model_output_loc
    jsonOutput["r2"] = r2
    jsonOutput["mse"] = mse
    jsonOutput["RMSE"] = rmse
    jsonOutput["importances"] = importances
    jsonOutput["predictions"] = predictions.tolist()

    if st.checkbox('Show rf_reg raw data'):
        st.write(jsonOutput)
    

    #show model performance
    st.header("Model Performance")
    st.subheader("r2: "+str(r2))
    st.subheader("mse: "+str(mse))
    st.subheader("RMSE: "+str(rmse))


    st.header("Feature Importance")
    feat_df = pd.DataFrame(feature_importances, columns = ['Feature', 'Importance']) 
    
    st.table(feat_df)

    chart = alt.Chart(feat_df).mark_bar().encode(
    x="Feature",
    y="Importance"
    ).interactive().properties(title='Feature Importance Chart').configure_title(
    fontSize=20,
    )
    
    st.altair_chart(chart, use_container_width=True)


    

    st.markdown('### Predict with model')
    predict_feats = {}
    for feat in feature_list:
        predict_feats[feat] = st.number_input('Insert a value for '+feat)
    
    if len(predict_feats.keys()) == len(feature_list):
        feats_df = pd.DataFrame(predict_feats, index=[0])
        model_predictions = rf.predict(feats_df)
        st.markdown("## Predicted "+target_string+": "+str(model_predictions[0]))