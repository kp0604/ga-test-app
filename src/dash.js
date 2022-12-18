import React, { useState, useEffect } from 'react'
import axios from 'axios';
//import runReport from mdb-easydata
import { gapi } from "gapi-script";

export default function Dash() {

    const [data, setData] = useState()

    //   Make sure the client is loaded and sign-in is complete before calling this method.
    const authenticate = ()=> {
        return gapi.auth2.getAuthInstance()
            .signIn({scope: "https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly"})
            .then(function() { console.log("Sign-in successful"); },
                  function(err) { console.error("Error signing in", err); });
      }
      function loadClient() {
        gapi.client.setApiKey("AIzaSyD35v7Jb-5j1FDA3-_5uEQJD-S48ib57qY");
        return gapi.client.load("https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta")
            .then(function() { console.log("GAPI client loaded for API"); },
                  function(err) { console.error("Error loading GAPI client for API", err); });
      }
      const execute = () =>{
        return gapi.client.analyticsdata.properties.runRealtimeReport({
          "property": "properties/345903224",
          "resource": {
            "dimensions": [
              {
                "name": "country"
              }
            ],
            "metrics": [
              {
                "name": "activeUsers"
              }
            ]
          }
        })
            .then(function(response) {
                    // Handle the results here (response.result has the parsed body).
                    console.log("Response", response);
                    setData(response)
                  },
                  function(err) { console.error("Execute error", err); });
      }
      gapi.load("client:auth2", function() {
        gapi.auth2.init({client_id: "992884992438-rjs8r8kbl9aqgci36ohm8rdjb429h027.apps.googleusercontent.com"});
      });

    //useEffect( () => {
    //    let url = 'https://analyticsdata.googleapis.com/v1beta/properties/GA4_PROPERTY_ID:345903224'
    //    let body = {
    //        "dimensions": [{ "name": "country" }],
    //        "metrics": [{ "name": "activeUsers" }]
    //    }

    //    axios.post( url, body )
    //        .then( function ( response ) {
    //            console.log( response );
    //        } )
    //        .catch( function ( error ) {
    //            console.log( error );
    //        } );

    //    return () => {
    //    }
    //}, [] )

    const loadData=() =>{
        // Your GA property ID
        const propertyId = "";
      
        const startDate = "7daysAgo";
        const endDate = "today";
        const metrics = [
          { name: "activeUsers" },
          { name: "screenPageViews" },
          { name: "sessions" },
        ];
      
        const query = {
          dateRanges: [{ startDate, endDate }],
          metrics: metrics,
        };
      
        //runReport(propertyId, query, displayResult);
      }

    return (
        <div>dash
            <button onClick={()=>authenticate().then(loadClient())}>authorize and load</button>
<button onClick={()=>execute()}>execute</button>
        </div>
    )
}


  /**
   * Sample JavaScript code for analyticsdata.properties.runRealtimeReport
   * See instructions for running APIs Explorer code samples locally:
   * https://developers.google.com/explorer-help/code-samples#javascript
   */
{/*<script src="https://apis.google.com/js/api.js"></script>
<script>

  function authenticate() {
    return gapi.auth2.getAuthInstance()
        .signIn({scope: "https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly"})
        .then(function() { console.log("Sign-in successful"); },
              function(err) { console.error("Error signing in", err); });
  }
  function loadClient() {
    gapi.client.setApiKey("YOUR_API_KEY");
    return gapi.client.load("https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta")
        .then(function() { console.log("GAPI client loaded for API"); },
              function(err) { console.error("Error loading GAPI client for API", err); });
  }
   Make sure the client is loaded and sign-in is complete before calling this method.
  function execute() {
    return gapi.client.analyticsdata.properties.runRealtimeReport({
      "property": "properties/345903224",
      "resource": {
        "dimensions": [
          {
            "name": "country"
          }
        ],
        "metrics": [
          {
            "name": "activeUsers"
          }
        ]
      }
    })
        .then(function(response) {
                // Handle the results here (response.result has the parsed body).
                console.log("Response", response);
              },
              function(err) { console.error("Execute error", err); });
  }
  gapi.load("client:auth2", function() {
    gapi.auth2.init({client_id: "YOUR_CLIENT_ID"});
  });
</script>
<button onclick="authenticate().then(loadClient)">authorize and load</button>
<button onclick="execute()">execute</button>*/}
