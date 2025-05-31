---
title: Keeping Promises Without Police
description: 'Stateless funding, enforced by Bitcoin. No courts. No police. Just code and trust.'
published: 2025-05-22
tags: [bitcoin]
category: 'bitcoin'
image: '/images/keeping-promises-without-police.webp'
author: 'paco de la india'
nostrPublicKey: 'npub1v67clmf4jrezn8hsz28434nc0y5fu65e5esws04djnl2kasxl5tskjmjjk'
---

## Ensuring Fair Revenue Sharing in a Stateless System

**Dear readers,**  
> “The direct use of force is such a poor solution to any problem, it is generally employed only by small children and large nations.” — *David Friedman*

### What if we could enforce promises without force?

David Friedman, in his book *The Machinery of Freedom*, tosses out a pretty wild idea: that people can build systems of cooperation and justice without needing a government at all. These systems rely on voluntary agreements, social reputation, and mutual incentives. In such a world, contracts hold value because honoring a promise brings greater rewards than breaking it.

---

### From Friedman to Bitcoin

This vision shaped the thinking behind **Angor**, a funding tool built on Bitcoin. Friedman’s ideas showed that systems of cooperation could work without central authority, and Bitcoin now provides the foundation to build them. It records transactions in a public and tamper-proof way. With features like **Taproot**, people can set clear rules for funding and accountability. Angor uses these tools to help founders and backers create agreements that are transparent and easy to verify.

The result is a new kind of marketplace where follow-through is visible, and reputation becomes a real asset. Instead of relying on enforcement from above, **trust is earned through action and built into the system itself**.

---

## What Happens After the Project Succeeds?

One important question kept returning throughout our work:  
**What happens after a project succeeds?**  
The founder raises the funds, delivers the product, and begins earning revenue.  
- What mechanism ensures that revenue is shared as promised?  
- How can investors protect their interests in an environment that relies on voluntary structure rather than external authority?

To explore possible answers, we looked at how libertarian thinkers approach contracts in stateless systems.

---

## How Libertarian Thinkers Approach Contracts Without the State

Friedman, along with other libertarian thinkers like **Murray Rothbard** and **Bruce Benson**, describes voluntarily created legal systems where people make binding agreements and use private mechanisms to enforce them. These mechanisms include:

- ✅ Reputational risk  
- ✅ Collateralized performance  
- ✅ Community arbitration  
- ✅ Decentralized insurance  

Such tools can replace state-backed enforcement when trust is earned and incentives are aligned.

---

## If Founders Are Anonymous

When a founder chooses to remain pseudonymous, legal enforcement is not available. In this case, the agreement between the founder and investor can rely on **cryptographic mechanisms** such as:

### 1. Performance Bonds
- Founders deposit additional Bitcoin into a separate, time-locked contract.  
- As they meet revenue-sharing milestones, they unlock portions of this bond.  
- If a revenue allocation is missed or a deadline passes, the contract **redirects the bond to investors** via a Taproot clause.  
  > Taproot lets you set up ‘if-this-then-that’ rules directly in Bitcoin transactions—privately.  

### 2. Revenue Proofs and Oracles
- Most founders earn in fiat (Stripe, Revolut, POS). So they:
  - Export a sales report.
  - Hash the report.
  - Post the hash to the Bitcoin blockchain (as timestamped proof).  
- An **oracle** (e.g., accountant or investor-nominated verifier) checks if the report matches the on-chain hash.  
- If so, the oracle **triggers a revenue-share payout** via a **Discreet Log Contract (DLC)**.

> A DLC is like a smart contract for Bitcoin. It only executes if the oracle confirms a specific outcome.

### 3. Reputation as Collateral
- Every payout is recorded on Bitcoin’s blockchain—**public and verifiable**.  
- Community-run indexers track contract streaks (consecutive, on-time payouts).  
- Streaks are posted on **Nostr**, signed and public.  
  > A strong streak = trust & future funding.  
  > A broken streak = risk & reduced access to community support.

---

## If Founders Are Public

When a founder uses a real identity, legal agreements can combine with on-chain contracts:

### 1. Legally Binding Smart Contracts
- Formal agreement links legal entity to specific Taproot addresses.  
- Revenue rules and breach clauses are written in legal language.  
- Enforceable in any jurisdiction the founder operates in.

### 2. Private Arbitration
- Both parties agree on a neutral arbitrator at contract setup.  
- If revenue payouts are missed, the arbitrator reviews:  
  - On-chain records  
  - Oracle confirmations  
  - Supporting documents  
- Then issues a fair decision—release, hold, or redirect funds.

### 3. Equity Sharing & Traditional Securities
- Public founders can offer **equity** (e.g., shares, tokens, convertible notes).  
- On-chain contracts can reference these equity arrangements.  
- Legal documents outline dividend rights, voting power, exit terms, etc.  

> This hybrid model balances **transparency** with **long-term value**.

---

## Final Thought: Alignment Over Authority

The ideas in *The Machinery of Freedom* show how people can build **cooperative systems** without centralized authority.  
**Angor puts those ideas into action** by applying them to decentralized crowdfunding.  
Each campaign becomes a **contract**.  
Each payout becomes a **signal of integrity**.  
**Reputation is built over time, through visible, verifiable performance.**

This model:
- Shifts enforcement from **force** to **alignment**
- Rewards **honesty** and **transparency**
- Makes misuse **costly by design**

By embedding trust directly into the protocol, Angor echoes the logic of **Bitcoin**:

> Bitcoin miners follow the rules not because they’re forced to, but because cheating costs energy and profit. The system self-regulates. Angor does the same.

---

## 🚀 If You’re Building on Angor…

If you’re building on Angor or exploring similar ideas, **reach out**.  
The tools are evolving.  
The community is growing.

Have you tried Angor yet?  
**See y’all next week. Thank you & Ciao.**
