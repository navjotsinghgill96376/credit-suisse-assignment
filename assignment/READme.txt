I have Implemented an API named '/validateTransaction' using nodejs
Assumptions-:
1)Input to the API will be given as a csv file containing Transactions 
,key name of the file in request body will be "file"
2)customer Details will be acting as Database in the Implementation I have taken that to as csv file
saved in Foldername customerDetails
customerDetails.csv path -:assigment/customerDetails/customerDetails.csv
3)nodejs should be installed in the testing machine

HOW TO RUN-:
in Terminal
Steps  
1)go in assigment directory to change directory execute cd assigment
run npm install in terminal                   
2)Write npm start in Terminal Press Enter 
a log wil be printed i.e "Server started listening on Port :3000"
3)In Postman (i.e a tool for testing APIS) select request type Post
URL of API-:localhost:3000/validateTransaction
in request body select form-data
check the key-value box row 
in the key dropdown showing text/file select file
keyname should be file 
value will be selected file
csv file for the Problem statement can be test.csv in sampletestingfiles
PATH of test.csv -assigment/sampletestingfiles/test.csv
Hit Send Button
Expected Response for test.csv as input is-:
{
            "Message": "Suspicous Transaction Found",
            "data": {
                "Jan": [
                    "T0175896345",
                    "T0175896347",
                    "T0175896349"
                ],
                "suspiciousAccount": [
                    "80074567",
                    "10010589",
                    "30045721",
                    "78524169"
                ],
                "Feb": [
                    "T0175896350",
                    "T0175896353"
                ],
                "Mar": [
                    "T0175896356",
                    "T0175896358"
                ]
            }
        }

  Output will be printed in console also
  4) To run unit testcase execute npm test in Terminal      







