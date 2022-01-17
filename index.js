const getWeb3 = async () => {
  return new Promise(async (resolve, reject) => {
    const web3 = new Web3(window.ethereum)

    try {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      resolve(web3)
    } catch (error) {
      reject(error)
    }
  })
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("connect_button").addEventListener("click", async ({ target }) => {
    const web3 = await getWeb3()
    const walletAddress = await web3.eth.requestAccounts()
    const walletBalanceInWei = await web3.eth.getBalance(walletAddress[0])
    const walletBalanceInEth = Math.round(Web3.utils.fromWei(walletBalanceInWei) * 1000) / 1000

    target.setAttribute("hidden", "hidden")

    document.getElementById("wallet_address").innerText = walletAddress
    document.getElementById("wallet_balance").innerText = walletBalanceInEth
    document.getElementById("wallet_info").removeAttribute("hidden")
  })
})
