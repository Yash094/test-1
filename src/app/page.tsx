"use client";
import { client } from "./client";
import { estimateGas, getContract, Hex, prepareContractCall } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import {
  ConnectButton,
  TransactionButton,
  useActiveAccount,
} from "thirdweb/react";

export default function Home() {
  const account = useActiveAccount()
  const contract = getContract({
    chain: defineChain(50311),
    client,
    address: "0xa8ede32e4735F8E5147a3491a87379CfB0591c44"
  })


  return (
    <main className="min-h-screen p-8 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold mb-4">Wallet Connection</h1>

      <div className="flex flex-col items-center gap-4">
        <ConnectButton
          client={client}
          chain={defineChain(50311)}
          accountAbstraction={{
            chain: defineChain(50311),
            gasless: true
          }}
        />
        <TransactionButton
          transaction={async () => {
            let estimateTx = prepareContractCall({
              contract,
              method: "function registerUser(string username, address wallet)",
              params: ["test", account?.address as Hex]
            });
            const estimatedGas = await estimateGas({
              transaction: estimateTx,
              from: account?.address,
            });
            const neededGas = estimatedGas * 2n;
            let txFinal = prepareContractCall({
              contract,
              method: "function registerUser(string username, address wallet)",
              params: ["test", account?.address as Hex],
              extraGas: neededGas
            });
            return txFinal

          }}
          onTransactionSent={(result) => {
            console.log("Transaction submitted", result.transactionHash);
          }}
          onTransactionConfirmed={(receipt) => {
            console.log("Transaction confirmed", receipt.transactionHash);
          }}
          onError={(error) => {
            console.error("Transaction error", error);
          }}
        >
          Confirm Transaction
        </TransactionButton>

      </div>
    </main>
  );
}