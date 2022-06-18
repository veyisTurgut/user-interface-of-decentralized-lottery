// Source code to interact with smart contract

// web3 provider with fallback for old version
if (window.ethereum) {
    window.web3 = new Web3(window.ethereum)
    try {
        // ask user for permission
        ethereum.enable()
            // user approved permission
    } catch (error) {
        // user rejected permission
        console.log('user rejected permission')
    }
} else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider)
        // no need to ask for permission
} else {
    window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
}
console.log(window.web3.currentProvider)

// contractAddress and abi are setted after contract deploy
var lotteryAddress = "0xbaf396822D0DF1026f5a083DeF81F92bC8417ead";
var userAddress = "0x559e3DE36777b88b8b3B042c14e1Dc594C4e5af9";
var TlAddress = "0x02129BE4647f1369709D21861c51251ad63b0Cb9";
//var ticketAddress = "0xFd03e5877Cc8BB1307Da4811F6c450626E3BDf94"; 

var tlAbi = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "owner",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "account",
            "type": "address"
        }],
        "name": "balanceOf",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "decimals",
        "outputs": [{
            "internalType": "uint8",
            "name": "",
            "type": "uint8"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
            }
        ],
        "name": "decreaseAllowance",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amnt",
                "type": "uint256"
            }
        ],
        "name": "giveMoney",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
            }
        ],
        "name": "increaseAllowance",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "_origin",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_spender",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amnt",
                "type": "uint256"
            }
        ],
        "name": "myApprove",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "_from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "_amnt",
                "type": "uint256"
            }
        ],
        "name": "myTransfer",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "name",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "symbol",
        "outputs": [{
            "internalType": "string",
            "name": "",
            "type": "string"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address",
                "name": "from",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "to",
                "type": "address"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [{
            "internalType": "bool",
            "name": "",
            "type": "bool"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];
var lotteryAbi = [{
        "inputs": [{
            "internalType": "address",
            "name": "_tl_address",
            "type": "address"
        }],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [{
            "internalType": "bytes32",
            "name": "hash_rnd_number",
            "type": "bytes32"
        }],
        "name": "buyTicket",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "ticket_no",
            "type": "uint256"
        }],
        "name": "checkIfTicketWon",
        "outputs": [{
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "ticket_no",
            "type": "uint256"
        }],
        "name": "collectTicketPrize",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "ticket_no",
            "type": "uint256"
        }],
        "name": "collectTicketRefund",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_amnt",
            "type": "uint256"
        }],
        "name": "depositTL",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "uint256",
                "name": "i",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lottery_no",
                "type": "uint256"
            }
        ],
        "name": "getIthOwnedTicketNo",
        "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "uint256",
                "name": "i",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "lottery_no",
                "type": "uint256"
            }
        ],
        "name": "getIthWinningTicket",
        "outputs": [{
                "internalType": "uint256",
                "name": "ticket_no",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "lottery_no",
            "type": "uint256"
        }],
        "name": "getLastOwnedTicketNo",
        "outputs": [{
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            },
            {
                "internalType": "uint8",
                "name": "status",
                "type": "uint8"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "unixtimeinweek",
            "type": "uint256"
        }],
        "name": "getLotteryNo",
        "outputs": [{
            "internalType": "uint256",
            "name": "lottery_no",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "lottery_no",
            "type": "uint256"
        }],
        "name": "getTotalLotteryMoneyCollected",
        "outputs": [{
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "unixtimeinweek",
            "type": "uint256"
        }],
        "name": "myGetLotteryNo",
        "outputs": [{
            "internalType": "uint256",
            "name": "lottery_no",
            "type": "uint256"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "uint256",
                "name": "_ticket_no",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_N",
                "type": "uint256"
            }
        ],
        "name": "revealRndNumber",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_amnt",
            "type": "uint256"
        }],
        "name": "withdrawTL",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    }
];
var userAbi = [{
        "inputs": [{
                "internalType": "address",
                "name": "_lottery_contract_address",
                "type": "address"
            },
            {
                "internalType": "address",
                "name": "_tl_contract_address",
                "type": "address"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "stateMutability": "payable",
        "type": "fallback"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_amnt",
            "type": "uint256"
        }],
        "name": "approveContract",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_amnt",
            "type": "uint256"
        }],
        "name": "giveMoney",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "uint256",
            "name": "_num",
            "type": "uint256"
        }],
        "name": "hashNumber",
        "outputs": [{
            "internalType": "bytes32",
            "name": "",
            "type": "bytes32"
        }],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];

const status_arr = ["BOUGHT", "REVEALED", "WINNER", "CANCELLED", "REFUNDED", "COLLECTED"]

//contract instance
var User_contract = new web3.eth.Contract(userAbi, userAddress);

var Lottery_contract = new web3.eth.Contract(lotteryAbi, lotteryAddress);

var TL_contract = new web3.eth.Contract(tlAbi, TlAddress);

// TL_contract.handleRevert = false;
// User_contract.handleRevert = false;
// Lottery_contract.handleRevert = false;
//web3.eth.handleRevert = true;
// Accounts
var account;
web3.eth.getAccounts(function(err, accounts) {
    if (err != null) {
        alert("Error retrieving accounts.");
        return;
    }
    if (accounts.length == 0) {
        alert("No account found! Make sure the Ethereum client is configured properly.");
        return;
    }
    account = accounts[0];
    console.log('Account: ' + account);
    console.log('Accounts: ' + accounts);
    web3.eth.defaultAccount = account;
});

function getAccounts() { // this functions returns accounts and a promise object
    var mypromise = new Promise(function(resolve, reject) {
        web3.eth.getAccounts((error, response) => {
            if (error) {
                reject(error);
            } else {
                resolve(response);
            }
            console.log(response);
        });
    });
    return mypromise;
}
// endpoints
function depositTL() { // this functions returns accounts and a promise object
    var amount = document.getElementById("deposit_amount").value;
    Lottery_contract.methods.depositTL(parseInt(amount)).send({ from: account })
        .once('sending', function(payload) { document.getElementById('deposit_result').innerHTML = "Tx sending"; })
        .once('sent', function(payload) { document.getElementById('deposit_result').innerHTML = "Tx sent"; })
        .once('transactionHash', function(hash) { document.getElementById('deposit_result').innerHTML = "Tx hash is available."; })
        .once('receipt', function(receipt) { document.getElementById('deposit_result').innerHTML = "Receipt is available"; })
        .on('confirmation', function(confNumber, receipt, latestBlockHash) { document.getElementById('deposit_result').innerHTML = "Tx confirmed"; })
        .on('error', function(error) { document.getElementById('deposit_result').innerHTML = "Error occurred"; })
        .then(function(receipt) {
            document.getElementById('deposit_result').innerHTML = "Success";
            // will be fired once the receipt is mined
        });
}

function withdrawTL() { // this functions returns accounts and a promise object
    var amount = document.getElementById("withdraw_amount").value;
    Lottery_contract.methods.withdrawTL(parseInt(amount)).send({ from: account })
        .once('sending', function(payload) { document.getElementById('withdraw_result').innerHTML = "Tx sending"; })
        .once('sent', function(payload) { document.getElementById('withdraw_result').innerHTML = "Tx sent"; })
        .once('transactionHash', function(hash) { document.getElementById('withdraw_result').innerHTML = "Tx hash is available."; })
        .once('receipt', function(receipt) { document.getElementById('withdraw_result').innerHTML = "Receipt is available"; })
        .on('confirmation', function(confNumber, receipt, latestBlockHash) { document.getElementById('withdraw_result').innerHTML = "Tx confirmed"; })
        .on('error', function(error) { document.getElementById('withdraw_result').innerHTML = "Error occurred"; })
        .then(function(receipt) {
            document.getElementById('withdraw_result').innerHTML = "Success";
            // will be fired once the receipt is mined
        });
}

function buyTicket() { // buying ticket with selected account from metamask
    var hashed_num = document.getElementById("hashed_num").value;
    Lottery_contract.methods.buyTicket(hashed_num).send({ from: account })
        .once('sending', function(payload) { document.getElementById('purchase_result').innerHTML = "Tx sending"; })
        .once('sent', function(payload) { document.getElementById('purchase_result').innerHTML = "Tx sent"; })
        .once('transactionHash', function(hash) { document.getElementById('purchase_result').innerHTML = "Tx hash is available."; })
        .once('receipt', function(receipt) { document.getElementById('purchase_result').innerHTML = "Receipt is available"; })
        .on('confirmation', function(confNumber, receipt, latestBlockHash) { document.getElementById('purchase_result').innerHTML = "Tx confirmed"; })
        .on('error', function(error) { document.getElementById('purchase_result').innerHTML = "Error occurred"; })
        .then(function(receipt) {
            document.getElementById('purchase_result').innerHTML = "Success";
            // will be fired once the receipt is mined
        });
}

function hashRandomNumber() {
    var number = document.getElementById("hash_random_no").value;
    User_contract.methods.hashNumber(parseInt(number)).call({ from: account }, function(err, res) {
        if (err) {
            console.log("An error occured", err)
            return
        }
        console.log("hash_random_no_result: ", res)
        document.getElementById('hash_random_no_result').innerHTML = res;
    });
}

function collect_refund() {
    var ticket_no = document.getElementById("refund_ticket_no").value;
    Lottery_contract.methods.collectTicketRefund(parseInt(ticket_no)).send({ from: account })
        .once('sending', function(payload) { document.getElementById('collect_refund_result').innerHTML = "Tx sending"; })
        .once('sent', function(payload) { document.getElementById('collect_refund_result').innerHTML = "Tx sent"; })
        .once('transactionHash', function(hash) { document.getElementById('deposit_rescollect_refund_resultult').innerHTML = "Tx hash is available."; })
        .once('receipt', function(receipt) { document.getElementById('collect_refund_result').innerHTML = "Receipt is available"; })
        .on('confirmation', function(confNumber, receipt, latestBlockHash) { document.getElementById('collect_refund_result').innerHTML = "Tx confirmed"; })
        .on('error', function(error) { document.getElementById('collect_refund_result').innerHTML = "Error occurred"; })
        .then(function(receipt) {
            document.getElementById('collect_refund_result').innerHTML = receipt;
            // will be fired once the receipt is mined
        });
}

function reveal() {
    var ticket_no = document.getElementById("reveal_ticket_no").value;
    var random_no = document.getElementById("reveal_random_no").value;
    Lottery_contract.methods.revealRndNumber(parseInt(ticket_no), parseInt(random_no)).send({ from: account })
        .once('sending', function(payload) { document.getElementById('reveal_result').innerHTML = "Tx sending"; })
        .once('sent', function(payload) { document.getElementById('reveal_result').innerHTML = "Tx sent"; })
        .once('transactionHash', function(hash) { document.getElementById('reveal_result').innerHTML = "Tx hash is available."; })
        .once('receipt', function(receipt) { document.getElementById('reveal_result').innerHTML = "Receipt is available"; })
        .on('confirmation', function(confNumber, receipt, latestBlockHash) { document.getElementById('reveal_result').innerHTML = "Tx confirmed"; })
        .on('error', function(error) { document.getElementById('reveal_result').innerHTML = "Error occurred"; })
        .then(function(receipt) {
            document.getElementById('reveal_result').innerHTML = "Success";
            // will be fired once the receipt is mined
        });
}

function getLastTicket() {
    var lottery_no = document.getElementById("lastOwned_lottery_no").value;
    Lottery_contract.methods.getLastOwnedTicketNo(parseInt(lottery_no)).call({ from: account }, function(err, res) {
        if (err) {
            console.log("An error occured", err)
            document.getElementById('get_last_owned_ticket_no_result').innerHTML = "Error occurred";
            document.getElementById('get_last_owned_ticket_status_result').innerHTML = "";
            return
        }
        console.log("get_last_owned_ticket_result: ", res)
        const ticket_id = res[0]
        const status = status_arr[res[1]]
        document.getElementById('get_last_owned_ticket_no_result').innerHTML = "Ticket no: " + ticket_id;
        document.getElementById('get_last_owned_ticket_status_result').innerHTML = "Status: " + status;
    });
}

function getIthBought() {
    var i = document.getElementById("owned_i").value;
    var lottery_no = document.getElementById("ith_owned_lottery_no").value;
    Lottery_contract.methods.getIthOwnedTicketNo(parseInt(i), parseInt(lottery_no)).call({ from: account }, function(err, res) {
        if (err) {
            console.log("An error occured", err)
            document.getElementById('get_ith_owned_ticket_no_result').innerHTML = "Error occurred.";
            document.getElementById('get_ith_owned_ticket_status_result').innerHTML = "";
            return
        }
        console.log("get_ith_owned_ticket_no_result: ", res)
        const ticket_id = res[0]
        const status = status_arr[res[1]]
        document.getElementById('get_ith_owned_ticket_no_result').innerHTML = "Ticket no: " + ticket_id;
        document.getElementById('get_ith_owned_ticket_status_result').innerHTML = "Status: " + status;
    });
}

function checkIfWon() {
    var ticket_no = document.getElementById("won_ticket_no").value;
    Lottery_contract.methods.checkIfTicketWon(parseInt(ticket_no)).call({ from: account }, function(err, res) {
        if (err) {
            console.log("An error occured", err)
            document.getElementById('check_if_ticket_won_result').innerHTML = "Error occurred!";
            return;
        }
        console.log(res)
        if (res > 0) {
            document.getElementById('check_if_ticket_won_result').innerHTML = "You won " + res + " TL.";
        } else {
            document.getElementById('check_if_ticket_won_result').innerHTML = "You didn't won anything.";
        }
    });
}

function collect_prize() {
    var ticket_no = document.getElementById("prize_ticket_no").value;
    Lottery_contract.methods.collectTicketPrize(parseInt(ticket_no)).call({ from: account }, function(err, res) {
        if (err) {
            console.log("An error occured", err)
            document.getElementById('collect_prize_result').innerHTML = "Error occurred.";
        } else if (res == undefined || Object.keys(res).length === 0) {
            document.getElementById('collect_prize_result').innerHTML = "0 TL";
            console.log("collect_prize_result: ", res)
        } else {
            console.log("collect_prize_result: ", res)
            document.getElementById('collect_prize_result').innerHTML = res + " TL";
        }
    });
}

function getIthWinner() {
    var i = document.getElementById("ith_winner").value;
    var lottery_no = document.getElementById("getIth_lottery_no").value;
    Lottery_contract.methods.getIthWinningTicket(parseInt(i), parseInt(lottery_no)).call({ from: account }, function(err, res) {
        if (err) {
            console.log("An error occured", err)
            document.getElementById('getIth_result').innerHTML = "Error occurred.";
            return
        }
        console.log("getIth_result: ", res)
        document.getElementById('getIth_result').innerHTML = res;
    });
}

function getLotteryNo() {
    var unix_time_in_week = document.getElementById("unix_time_in_week").value;
    Lottery_contract.methods.getLotteryNo(parseInt(unix_time_in_week)).call({ from: account }, function(err, res) {
        if (err) {
            console.log("An error occured", err)
            document.getElementById('current_lottery_result').innerHTML = "Error occurred.";
            return
        }
        console.log("current_lottery_result: ", res)
        document.getElementById('current_lottery_result').innerHTML = res;
    });
}

function getTotalMoneyCollected() {
    var lottery_no = document.getElementById("get_total_lottery_money_lottery_no").value;
    Lottery_contract.methods.getTotalLotteryMoneyCollected(parseInt(lottery_no)).call({ from: account }, function(err, res) {
        if (err) {
            console.log("An error occured", err)
            document.getElementById('get_total_lottery_money_result').innerHTML = "Error occurred.";
            return
        }
        console.log("get_total_lottery_money_result: ", res)
        document.getElementById('get_total_lottery_money_result').innerHTML = res;
    });
}

function getUnixTimeInWeek() {
    document.getElementById("unix_time_in_week_response").innerHTML = Math.floor(Date.now() / 1000)
}

function giveMoney() {
    var mint_tl_amount = document.getElementById("mint_tl_amount").value;
    User_contract.methods.giveMoney(parseInt(mint_tl_amount)).send({ from: account })
        .once('sending', function(payload) { document.getElementById('mintTL_result').innerHTML = "Tx sending"; })
        .once('sent', function(payload) { document.getElementById('mintTL_result').innerHTML = "Tx sent"; })
        .once('transactionHash', function(hash) { document.getElementById('mintTL_result').innerHTML = "Tx hash is available."; })
        .once('receipt', function(receipt) { document.getElementById('mintTL_result').innerHTML = "Receipt is available"; })
        .on('confirmation', function(confNumber, receipt, latestBlockHash) { document.getElementById('mintTL_result').innerHTML = "Tx confirmed"; })
        .on('error', function(error) { document.getElementById('mintTL_result').innerHTML = "Error occurred"; })
        .then(function(receipt) {
            document.getElementById('mintTL_result').innerHTML = "Success";
            // will be fired once the receipt is mined
        });
}

function approveContract() {
    var allow_contract = document.getElementById("allow_contract").value;
    User_contract.methods.approveContract(parseInt(allow_contract)).send({ from: account })
        .once('sending', function(payload) { document.getElementById('allow_contract_result').innerHTML = "Tx sending"; })
        .once('sent', function(payload) { document.getElementById('allow_contract_result').innerHTML = "Tx sent"; })
        .once('transactionHash', function(hash) { document.getElementById('allow_contract_result').innerHTML = "Tx hash is available."; })
        .once('receipt', function(receipt) { document.getElementById('allow_contract_result').innerHTML = "Receipt is available"; })
        .on('confirmation', function(confNumber, receipt, latestBlockHash) { document.getElementById('allow_contract_result').innerHTML = "Tx confirmed"; })
        .on('error', function(error) { document.getElementById('allow_contract_result').innerHTML = "Error occurred"; })
        .then(function(receipt) {
            document.getElementById('allow_contract_result').innerHTML = "Success";
            // will be fired once the receipt is mined
        });
}

function getTLBalance() {
    var promise = getAccounts();
    promise.then(function(result) {

        TL_contract.methods.balanceOf(account).call({ from: account }, function(err, res) {
            if (err) {
                console.log("An error occured", err)
                return
            }
            console.log("The balance is: ", res)
            document.getElementById('balance_result').innerHTML = "The balance is: " + res + " TL";
        });
    });
}