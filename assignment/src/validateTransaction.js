const csv = require('csvtojson')
let Parser = new csv({
    delimiter: '|',
})
const path = require('path')
const {
    Messages,
    createResponse
} = require('../config/config')
customerDetailsPath = path.dirname(__dirname) + '/customerDetails/customerDetails.csv'
const isFileFormatCorrect = (file) => {
    if (file && file.mimetype && file.mimetype == 'text/csv')
        return 1;
    else
        return 0;
}
// getMapofAccountno creates maping on account no
const getMapofAccountno = (customerDetailsArray) => {
    let accountNoMap = {}

    customerDetailsArray.forEach(obj => {
        accountNoMap[obj.Account] = {
            Address: obj.Address,
            PhoneNumber: obj.PhoneNumber
        }
    })
    return accountNoMap
}
const accountNoPresent = (accountNoMap, account) => {
    accountNos = Object.keys(accountNoMap);
    return accountNos.includes(account)
}

const PrintOutput = (Suspicious) => {

    Object.keys(Suspicious).forEach(key => {

        if (key != 'suspiciousAccount') {
            console.log('For The Month of ' + key + '\n' + 'Suspicious Transactions :')
            Suspicious[key].forEach(trans => {
                console.log(trans)
            })
        }
    })

    if (Suspicious['suspiciousAccount'] && Suspicious['suspiciousAccount'].length) {
        console.log('Suspicious Account')
        Suspicious['suspiciousAccount'].forEach(acc => {
            console.log(acc)
        })

    }

}
/*

validateTransaction  Function file take Transaction as an input
convert csv containing Transaction and customerDetails
to object Array
Run a loop on TransactionArray
check ToAccountAddress === fromAccountAddress && toPhoneno === fromPhoneno if true
add TransactionId to Suspicious Transactions
and do The required Processing On it and returns response

*/


const validateTransaction = async (Transactions) => {
    try {
        Parser = new csv({
            delimiter: '|',
        })
        let TransactionsArray = await Parser.fromString(Transactions)
        Parser = new csv({
            delimiter: '|',
        })
        let customerDetailsArray = await Parser.fromFile(customerDetailsPath);
        if (TransactionsArray && TransactionsArray.length > 0 && customerDetailsArray && customerDetailsArray.length > 0) {
            let accountNoMap = await getMapofAccountno(customerDetailsArray);
            let Suspicious = {}
            let AccountSet = new Set(),
                TransactionSet = new Set();
            TransactionsArray.forEach(transac => {
                if (accountNoPresent(accountNoMap, transac.ToAccount) && accountNoPresent(accountNoMap, transac.FromAccount)) {
                    let TransactionMonth = new Date(transac.TransactionDate).toLocaleString('default', {
                        month: 'short'
                    })
                    let toAccountAddress = accountNoMap[transac.ToAccount].Address.trim()
                    let fromAccountAddress = accountNoMap[transac.FromAccount].Address.trim()
                    let toPhoneno = accountNoMap[transac.ToAccount].PhoneNumber.trim();
                    let fromPhoneno = accountNoMap[transac.FromAccount].PhoneNumber.trim();
                    if (toAccountAddress === fromAccountAddress && toPhoneno === fromPhoneno) {
                        if (!Suspicious[TransactionMonth])
                            Suspicious[TransactionMonth] = []
                        if (!TransactionSet.has(transac.TransactionId)) {
                            Suspicious[TransactionMonth].push(transac.TransactionId)
                            TransactionSet.add(transac.TransactionId)

                        }
                        if (!AccountSet.has(transac.ToAccount)) {
                            if (!Suspicious['suspiciousAccount'])
                                Suspicious['suspiciousAccount'] = []
                            Suspicious['suspiciousAccount'].push(transac.ToAccount)
                            AccountSet.add(transac.ToAccount)
                        }
                        if (!AccountSet.has(transac.FromAccount)) {
                            if (!Suspicious['suspiciousAccount'])
                                Suspicious['suspiciousAccount'] = []
                            Suspicious['suspiciousAccount'].push(transac.FromAccount)
                            AccountSet.add(transac.FromAccount)
                        }
                    }
                }
            })
            if (Object.keys(Suspicious).length > 0) {
                PrintOutput(Suspicious);
                return createResponse(Messages.SuspiciousTransactionMsg, Suspicious)
            } else {
                return createResponse(Messages.NoSuspiciousTransactionMsg, Suspicious)
            }
        } else {
            return createResponse(Messages.emptyFile, {});
        }
    } catch (error) {
        console.log(error);

    }

}


module.exports = {
    isFileFormatCorrect,
    validateTransaction

}