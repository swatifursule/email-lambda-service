'use strict';


process.env['PATH'] = process.env['PATH'] + ':' + process.env['LAMBDA_TASK_ROOT'] + ":/tmp/";
var async = require("async");
var AWS = require("aws-sdk");
var request = require("request");

// The function to send SES email message
module.exports.sendMail = (event, context, callback) =>
{
    let username, secret, endpoint, bccEmailAddresses, ccEmailAddresses, toEmailAddresses, bodySubject, bodyData;

    function initializeParams(parentBody) {
        if (parentBody != null) {
  	    bccEmailAddresses = parentBody.bccEmailAddresses;
	    ccEmailAddresses = parentBody.ccEmailAddresses;
 	    toEmailAddresses = parentBody.toEmailAddresses;
 	    bodySubject = parentBody.bodySubject;
	    bodyData = parentBody.bodyData;   	    
        }
        else {
            bccEmailAddresses = 'swati@silvertrak.com.au';
            ccEmailAddresses = '';
            toEmailAddresses = 'swatifursule@gmail.com';
            bodySubject = "Hi Swati test time";
            bodyData = "everything will be fine";

        }
    }
    if (event.body !== null && event.body !== undefined) { //from api gateway invoke url params
        initializeParams(event.body);
    } else { //from lambda function exeuction
        initializeParams(event)
    }

    /*AWS.config.update({
        accessKeyId: username,
        secretAccessKey: secret
    });*/


var apiBaseUrl = 'https://api.mailgun.net/v3/sandboxa734e1fcac97471580d527cae777e9d2.mailgun.org';

var apiBaseUrl2= 'https://api.sendgrid.com/v3/mail/send';
var apiKey     = 'key-de8cac6342166fb86adcd20d4afeac5f';
var apiKey2    = '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';
var from       = 'swatifursule@gmail.com';
var to         =  toEmailAddresses;
var cc         =  ccEmailAddresses;
var bcc        =  bccEmailAddresses;
var subject    =  bodySubject;
var text       =  bodyData;

var mailgunOpts = {
    url: apiBaseUrl + '/messages',
    headers: {
        Authorization: 'Basic ' + new Buffer('api:' + apiKey).toString('base64')
    },
    form: {
        from   : from,
        to     : to, 
        cc     : cc,
        bcc    : bcc,
        subject: subject,
        text   : text
    }
};

var sendGridOpts = {
    url: apiBaseUrl2,
    headers: {
        Authorization: 'Bearer ' + apiKey2,
        "Content-Type": "application/json"
    },
    personalizations: [
        {
            "to": [
                {
                    "email": to
                }
            ],
            "cc": [
                {
                    "email": cc
                }
            ],

            "bcc": [
                {
                    "email": bcc
                }
            ],
            "subject": subject
        }
    ],
    "from": {
        "email": from
    },
    "content": [
        {
            "type": "text/plain",
            "value": text
        }
    ]
};


async.waterfall([
    // try with MailGun first, if failed, use SendGrid email service provider.
    function sendViaMailGun(next){
	request.post(mailgunOpts, function(err, response, body) {
        if (!err) {
            console.log(err);
            callback(null, body);
        }
        else {
            console.log(body);
            next(err, body);
        }
	});
    },
   function sendViaSendGrid(target, next){
     console.log("sending via sendgrid" );

        request.post(sendGridOpts, function(err, response, body) {
            console.log(err || body);
            callback(null, body);
        });

   }
],
function (err) {
    if (err) {
        console.error("Unable to send " + err);
        //c(err);
    } else {
        console.log("Sent");
    }
}
);
}
