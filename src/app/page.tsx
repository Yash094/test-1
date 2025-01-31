"use client";
import { client } from "./client";
import { baseSepolia, defineChain, sepolia } from "thirdweb/chains";
import {
  ConnectButton,
  PayEmbed,
} from "thirdweb/react";
import { getDefaultToken } from "thirdweb/react";

export default function Home() {
 


  return (
    <main className="min-h-screen p-8 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold mb-4">Wallet Connection</h1>

      <div className="flex flex-col items-center gap-4">
        <ConnectButton
          client={client}
          chain={defineChain(50311)}
        />
      
      <PayEmbed
    client={client}
    theme="dark"
    payOptions={{
        mode: "direct_payment",
        paymentInfo: {
            amount: "0.0001",
            chain: sepolia,
            // @ts-ignore: temporary for testing
            token: getDefaultToken(sepolia, "ETH"),
            sellerAddress: "0xEF87c05700668863519b19906a57068e4044534C",
        },
        metadata: {
           
        },
        purchaseData: {
           
        },
    }}
/>
      </div>
    </main>
  );
}