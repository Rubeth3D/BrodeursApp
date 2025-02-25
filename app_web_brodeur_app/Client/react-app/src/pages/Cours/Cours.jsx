import Navbar from "../../element/navbar";
import Footer from "../../element/footer";
import {Link} from "react-router-dom";
import React,{ Fragment, useState} from "react";
import winston from "winston";

function Cours() {
    const logger = winston.createLogger({
      level: "info",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} [${level.toUpperCase()}]: ${message}`;
        })
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: "server.log" }),
      ],
    });
    const onSubmitForm = async () => {
        try {
            
        } catch (error) {
            logger.info(erro);
        }
    }
    return(

        <> 
        <Navbar/>

        <Footer/>
        </>    
       
    )


}