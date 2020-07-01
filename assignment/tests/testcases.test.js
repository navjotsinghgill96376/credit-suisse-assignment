
const request=require('supertest');
const app=require('../app');
const fs=require('fs');
const path = require('path')

test('Sample file testcase given in the Problem statement',async(done)=>{
    const filePath = path.dirname(__dirname)+'/sampletestingfiles/test.csv';
    if(fs.existsSync(filePath))
    {
        
            const response=await request(app)
            .post('/validateTransaction')
            .attach('file',filePath)
            .expect(200)
   
    
        
        expect(response.body).toMatchObject({
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
        })

    }
    done()

})

test('Transaction csv file is Empty',async(done)=>{
    const filePath = path.dirname(__dirname)+'/sampletestingfiles/test1.csv';
    if(fs.existsSync(filePath))
    {
        const response=await request(app)
         .post('/validateTransaction')
         .attach('file',filePath)
         .expect(200)

        expect(response.body).toMatchObject({
            "Message": "Transaction File is Empty",
            "data": {}
        })


    }
    
    done()

})

test('fileformat should be correct',async(done)=>{
    const filePath = path.dirname(__dirname)+'/sampletestingfiles/test2.pdf';
    if(fs.existsSync(filePath))
    {
        const response=await request(app)
         .post('/validateTransaction')
         .attach('file',filePath)
         .expect(206)

        expect(response.body).toMatchObject({
            "Message": "File Not Present/File Format should be csv",
            "data": {}
        })


    }
    done()
})

test('if file contains Duplicate Transaction then api should give same results',async(done)=>{
    const filePath = path.dirname(__dirname)+'/sampletestingfiles/test3.csv';
    if(fs.existsSync(filePath))
    {
        
            const response=await request(app)
            .post('/validateTransaction')
            .attach('file',filePath)
            .expect(200)
   
    
        
        expect(response.body).toMatchObject({
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
        })

    }
    done()

})

test('When all transactions are Correct',async(done)=>{
    const filePath = path.dirname(__dirname)+'/sampletestingfiles/test4.csv';
    if(fs.existsSync(filePath))
    {
        
            const response=await request(app)
            .post('/validateTransaction')
            .attach('file',filePath)
            .expect(200)
   
    
        
        expect(response.body).toMatchObject({
            "Message": "No Suspicious Transaction",
            "data": {}
        })

    }
    done()

})


test('When nothing is given in input',async(done)=>{
        
            const response=await request(app)
            .post('/validateTransaction')
            .expect(206)

        expect(response.body).toMatchObject({
            "Message": "File Not Present/File Format should be csv",
            "data": {}
        })

    
    done()

})