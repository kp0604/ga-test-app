import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function Dash() {

    const [data, setData] = useState()

    useEffect( () => {
        let url = 'https://analyticsdata.googleapis.com/v1beta/properties/GA4_PROPERTY_ID:345903224'
        let body = {
            "dimensions": [{ "name": "country" }],
            "metrics": [{ "name": "activeUsers" }]
        }

        axios.post( url, body )
            .then( function ( response ) {
                console.log( response );
            } )
            .catch( function ( error ) {
                console.log( error );
            } );

        return () => {
        }
    }, [] )

    return (
        <div>dash</div>
    )
}