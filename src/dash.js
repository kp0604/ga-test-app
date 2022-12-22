import React, { useState, useEffect } from 'react'
import { gapi } from "gapi-script";

export default function Dash() {

    const [data, setData] = useState()
    const [data2, setData2] = useState()

    //   Make sure the client is loaded and sign-in is complete before calling this method.
    const authenticate = () => {
        return gapi.auth2.getAuthInstance()
            .signIn( { scope: "https://www.googleapis.com/auth/analytics https://www.googleapis.com/auth/analytics.readonly" } )
            .then( function () { console.log( "Sign-in successful" ); },
                function ( err ) { console.error( "Error signing in", err ); } );
    }
    function loadClient() {
        gapi.client.setApiKey( "AIzaSyD35v7Jb-5j1FDA3-_5uEQJD-S48ib57qY" );
        return gapi.client.load( "https://analyticsdata.googleapis.com/$discovery/rest?version=v1beta" )
            .then( function () {
                console.log( "GAPI client loaded for API" );
                //execute()
            },
                function ( err ) { console.error( "Error loading GAPI client for API", err ); } );
    }
    const execute = () => {
        console.log( 'k', gapi.client.analyticsdata )
        return gapi.client.analyticsdata.properties.runRealtimeReport( {
            "property": "properties/345903224",
            "resource": {
                "metrics": [
                    {
                        "name": "screenPageViews",
                    },
                    {
                        "name": "activeUsers",
                    },
                ]
            }
        } )
            .then( function ( response ) {
                // Handle the results here (response.result has the parsed body).
                console.log( "Response1", response );
                setData( response.result )
            },
                function ( err ) { console.error( "Execute error", err ); } );
    }

    const execute2 = () => {
        const startDate = "7daysAgo";
        const endDate = "today";
        return gapi.client.analyticsdata.properties.runReport( {
            "property": "properties/345903224",
            "dateRanges": [{ startDate, endDate }],
            "metrics": [
                {
                    "name": "bounceRate",
                },
            ]

        } )
            .then( function ( response ) {
                // Handle the results here (response.result has the parsed body).
                console.log( "Response2", response );
                setData2(response.result)
            },
                function ( err ) { console.error( "Execute error", err ); } );
    }

    gapi.load( "client:auth2", function () {
        gapi.auth2.init( { client_id: "992884992438-rjs8r8kbl9aqgci36ohm8rdjb429h027.apps.googleusercontent.com" } );
    } );

    return (
        <div>
            <p>NOTE : first load client to load report datas</p>
            <button onClick={() => authenticate().then( loadClient() )}>load client</button>
            <h1>data from runrealtimereport</h1>
            <button onClick={() => execute()}>getdata-from-runrealtime-report</button>
            <h3>Screen page views</h3>
            <p>{data?.rows[0]?.metricValues[0].value}</p>
            <h3>active users</h3>
            <p>{data?.rows[0].metricValues[1].value}</p>
            <h1>data from runreport</h1>
            <button onClick={() => execute2()}>getdata-from-run-report</button>
            <h3>bounce rate</h3>
            <p>{data2?.rows[0]?.metricValues[0].value}</p>
        </div>
    )
}



