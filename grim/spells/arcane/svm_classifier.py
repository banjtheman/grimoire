import pandas as pd, numpy as np
import sys, argparse, logging
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
from sklearn.model_selection import RandomizedSearchCV
from sklearn.svm import SVR
from sklearn import svm
from sklearn.model_selection import GridSearchCV
from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score
import pickle
import random
import streamlit as st
import altair as alt
import os.path
from os import path
import json


def download_model(target_string):
    print("todo")


def does_model_exsit(target_string):
    model_output_loc = "models/svm_model_" + target_string + ".pkl"

    if path.exists(model_output_loc):
        print("model exists")
        return True
    else:
        print("model does not exist")
        return False

@st.cache(allow_output_mutation=True)
def load_model(model_output_loc):

    svm_model = pickle.load(open(model_output_loc, "rb"))
    return svm_model


def train_model(svm_model, healed_data, target_string):
    svm_model.fit(healed_data["train_features"], healed_data["train_target"])

    # save model output
    model_output_loc = "models/svm_model_" + target_string + ".pkl"
    model_output = open(model_output_loc, "wb")
    pickle.dump(svm_model, model_output)
    model_output.close()
    print("saving model to: " + model_output_loc)
    return


def eval_model(svm_model, healed_data):

    train_features = healed_data["train_features"]
    train_target = healed_data["train_target"]
    test_target = healed_data["test_target"]
    test_features = healed_data["test_features"]
    feature_list = healed_data["feature_list"]
    featuresarr = healed_data["features_arr"]
    target = healed_data["target"]
    target_string = healed_data["target_string"]
    raw_data = healed_data["mana"]

    predictions = svm_model.predict(test_features)


    ac_score = accuracy_score(test_target, predictions)
    f1 = f1_score(test_target,predictions,average='weighted')
    precision = precision_score(test_target,predictions,average='weighted')
    recall = recall_score(test_target,predictions,average='weighted')

    model_output_loc = "models/svm_model_" + target_string + ".pkl"

    jsonOutput = {}
    jsonOutput["model_location"] = model_output_loc
    jsonOutput["ac_score"] = ac_score
    jsonOutput["f1"] = f1
    jsonOutput["precision"] = precision
    jsonOutput["recall"] = recall

    jsonOutput["predictions"] = predictions.tolist()

    json_path = "models/svm_model_" + target_string + ".json"

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(jsonOutput, f, ensure_ascii=False, indent=4)

    return jsonOutput


def spell(spell_inputs):

    # print("rf_reg heal data")

    randInt = random.randint(1, 200)

    svm_model = svm.LinearSVC(random_state=randInt)


    # train the model!!!!
    # print("Heres model data")
    healed_data = spell_inputs["healed_data"]

    # print(str(healed_data))
    train_features = healed_data["train_features"]
    train_target = healed_data["train_target"]
    test_target = healed_data["test_target"]

    test_features = healed_data["test_features"]
    feature_list = healed_data["feature_list"]
    featuresarr = healed_data["features_arr"]
    target = healed_data["target"]
    target_string = healed_data["target_string"]
    raw_data = healed_data["mana"]

    # should check if model exists, if it does load model
    jsonOutput = {}

    if does_model_exsit(target_string):
        model_output_loc = "models/svm_model_" + target_string + ".pkl"
        svm_model = load_model(model_output_loc)
        json_path = "models/svm_model_" + target_string + ".json"
        with open(json_path) as json_file:
            jsonOutput = json.load(json_file)
    else:
        try:
            train_model(svm_model, healed_data, target_string)
        except:
            st.error("Classifier does not work on number based categories like "+target_string)
            return

        jsonOutput = eval_model(svm_model, healed_data)

    if st.checkbox("Show svm raw data"):
        st.write(jsonOutput)

    # show model performance
    st.header("Model Performance")
    st.success("F1 Score: "+str(jsonOutput["f1"]))
    st.success("Accuracy: "+str(jsonOutput["ac_score"]))
    st.success("Recall: "+str(jsonOutput["recall"]))
    st.success("Precision: "+str(jsonOutput["precision"]))


 

    # bars = alt.Chart(feat_df).mark_bar().encode(y="Feature", x="Importance")

    # text = bars.mark_text(
    # align='left',
    # baseline='middle',
    # dx=3  # Nudges text to right so it doesn't appear on top of the bar
    # ).encode(
    # text='Feature'
    # )

    # chart = bars+text


    # chart = (
    #     alt.Chart(feat_df)
    #     .mark_bar()
    #     .encode(y=alt.Y('Feature', sort='-x'), x="Importance",tooltip=list(feat_df.columns))
    #     .properties(title="Feature Importance Chart")
    #     .configure_title(fontSize=20,)
    # ).properties(height=700)
    # st.altair_chart(chart, use_container_width=True)

    if st.button("Retrain Model"):
        train_model(svm_model, healed_data, target_string)
        jsonOutput = eval_model(svm_model, healed_data)

    # if st.button('Download Model'):
    #     return download_model(target_string)

    st.markdown("### Predict with model")
    predict_feats = {}
    for feat in feature_list:
        predict_feats[feat] = st.number_input("Insert a value for " + feat)

    if len(predict_feats.keys()) == len(feature_list):
        feats_df = pd.DataFrame(predict_feats, index=[0])
        model_predictions = svm_model.predict(feats_df)
        print("## Predicted " + target_string + ": " + str(model_predictions[0]))
        st.markdown("## Predicted " + target_string + ": " + str(model_predictions[0]))

