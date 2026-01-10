# Results Learning - Two Hosting Options & Cost Estimation

## Executive Summary

Two paths forward:

**Option A: Shared Infrastructure** (You bill them at discounted rate)
- You own Hetzner account, manage the infrastructure
- Results Learning pays you a fixed fee for hosting
- You absorb any overages
- Profit margin: 70-80%

**Option B: Dedicated Server** (They own it)
- Results Learning gets dedicated Hetzner server
- They pay Hetzner directly
- You handle only n8n setup/management
- Profit margin: 95%+ (no infrastructure cost)

---

## Option A: Shared Infrastructure Model

### Your Cost (Actual Hetzner Bill)

**Primary Infrastructure**:
```
Hetzner CAX11 (2GB ARM): $4.50/month
Hetzner CAX21 (4GB ARM): $9.30/month
Domain + DNS: $12/year
Let's Encrypt SSL: $0/month (free)
────────────────────────────────
Monthly: $4.50-9.30
Annual: ~$54-111
```

**Note**: One server can run 5-10 clients easily (n8n handles 100+ workflows)

**Your Hetzner Bill**:
- Start: Single CAX11 ($4.50/month) = $54/year
- At 3-5 clients: Upgrade to CAX21 ($9.30/month) = $111.60/year
- At 10+ clients: Add second server (another $9.30) = $227.20/year

### Billing Results Learning: Option A

#### Scenario 1: Discounted Shared Infrastructure
**Your Cost**: $4.50/month (shared CAX11)
**Your Markup**: 150-200% (industry standard for shared hosting)
**Results Learning Pays**: $10-12/month

```
Your Cost (Hetzner): $4.50/month
Your Charge to Client: $10/month
Your Markup: 122%
Your Profit: $10 - $4.50 = $5.50/month = ~$66/year
```

#### Scenario 2: Fixed Monthly Fee (Cleaner)
**Your Cost**: $4.50/month
**You Bill Them**: $7/month

```
Your Cost: $4.50 × 12 = $54/year
You Bill Them: $7 × 12 = $84/year
Your Profit: $30/year
Markup: 56% (conservative, allows expansion)
```

#### Scenario 3: Aggressive (Higher Margin)
**Your Cost**: $4.50/month
**You Bill Them**: $15/month

```
Your Cost: $54/year
You Bill Them: $180/year
Your Profit: $126/year
Markup: 233%
Why this works:
- They save vs DigitalOcean ($464/year)
- You get healthy margin
- Room for additional infrastructure as they grow
```

---

## Option B: Dedicated Server Model

### What They Own

Results Learning gets their own Hetzner server:
```
Dedicated CAX11: $4.50/month
They pay directly to Hetzner
You provide setup + management
```

### Your Cost (Option B)

**Setup Fee** (one-time):
```
Hetzner account creation: $0
Server deployment: $0
OS installation: $0
Docker + PostgreSQL setup: $0 (your time, ~1 hour)
SSL/HTTPS configuration: $0 (your time, ~30 min)
n8n installation: $0 (your time, ~30 min)
────────────────────────────────
TOTAL SETUP: $0 (you absorb setup time)
```

**Monthly Management Cost** (your time):
```
Weekly monitoring: 30 min/week
Monthly updates: 30 min/month
Ad-hoc support: 30 min/month estimate
────────────────────────────────
Average: ~1.5 hours/month
At $50/hour consulting rate: $75/month
```

**But**: You bill them separately for this (see below)

### Billing Results Learning: Option B

#### Scenario 1: Hands-Off (They Manage It)
```
Setup Fee: $0-200 (one-time)
Monthly Hosting: $4.50 (they pay Hetzner directly)
Monthly Management: $0 (you only intervene if needed)

Their Cost: $4.50/month = $54/year
Your Cost: Setup time only
Your Profit: Consulting rate if they ask for support
```

#### Scenario 2: Monthly Managed Service
```
Setup Fee: $200-500 (one-time)
Monthly Hosting: $4.50 (they pay Hetzner)
Monthly Management Fee: $15/month (you bill them)

Their Cost: $4.50 + $15 = ~$234/year + one-time fee
Your Monthly Revenue: $15/month = $180/year
Your Profit: $180 - hourly cost (~$18-25/month work) = $150-160/year
```

#### Scenario 3: Full Managed Service
```
Setup Fee: $500 (one-time)
Monthly Hosting: $4.50 (they pay Hetzner)
Monthly Management: $30/month (you handle everything)
   - Weekly monitoring
   - Updates & patches
   - Backup verification
   - Performance optimization
   - Priority support (48-hour response)

Their Cost: $4.50 + $30 = ~$414/year + setup fee
Your Monthly Revenue: $30/month = $360/year
Your Profit: $360 - hourly cost (~$30-40/month work) = $320-340/year
```

---

## Complete Cost Comparison: All Scenarios

### OPTION A: Shared Infrastructure (You Own & Manage)

**Scenario A1: Conservative Markup ($7/month billing)**
```
Your Hetzner Cost:  $4.50/month
You Bill Them:      $7/month
Your Profit:        $2.50/month = $30/year
Your Markup:        56%

Over 5 clients (same server):
Your Cost:          $4.50/month (same)
You Bill 5× clients: $35/month total
Your Profit:        $35 - $4.50 = $366/year
Client sees:        $7/month fixed cost (best price anywhere)
```

**Scenario A2: Market-Rate Markup ($10/month billing)** - RECOMMENDED
```
Your Hetzner Cost:  $4.50/month
You Bill Them:      $10/month
Your Profit:        $5.50/month = $66/year
Your Markup:        122%

Over 5 clients:
Your Cost:          $4.50/month (same)
You Bill 5× clients: $50/month total
Your Profit:        $50 - $4.50 = $546/year
Client sees:        $10/month (cheaper than DigitalOcean at $27/month)
```

**Scenario A3: Premium Markup ($15/month billing)**
```
Your Hetzner Cost:  $4.50/month
You Bill Them:      $15/month
Your Profit:        $10.50/month = $126/year
Your Markup:        233%

Over 5 clients:
Your Cost:          $4.50/month (same)
You Bill 5× clients: $75/month total
Your Profit:        $75 - $4.50 = $846/year
Client sees:        $15/month (still 44% cheaper than DigitalOcean)
```

---

### OPTION B: Dedicated Server (They Own, You Manage)

**Scenario B1: Setup Only (No Ongoing Fees)**
```
Setup Fee:          $0-200 (one-time)
Monthly from them:  $0 (they pay Hetzner directly)
Your Profit:        Setup fee only = $0-200/year amortized = $0-16/month
Your Markup:        N/A (they pay market rate to Hetzner)

Their Cost:         $4.50/month = $54/year
Your Cost:          ~2 hours setup time
Your Profit:        $0-200
ROI: 0% (you break even or small one-time fee)
```

**Scenario B2: Managed Service ($15/month)**
```
Setup Fee:          $200 (one-time)
Monthly from them:  $4.50 to Hetzner + $15 to you
Your Profit:        $15/month = $180/year
Your Workload:      ~1.5 hours/month

Their Cost:         $4.50 + $15 = ~$234/year
Your Profit:        $200 + $180 = $380/year
Your Hourly Rate:   $180/year ÷ 18 hours/year = $10/hour (low)
```

**Scenario B3: Full Managed Service ($30/month)**
```
Setup Fee:          $500 (one-time)
Monthly from them:  $4.50 to Hetzner + $30 to you
Your Profit:        $30/month = $360/year

Their Cost:         $4.50 + $30 = ~$414/year
Your Profit:        $500 + $360 = $860/year
Your Workload:      ~2 hours/month (higher SLA)
Your Hourly Rate:   $360/year ÷ 24 hours/year = $15/hour
```

---

## YIELD Framework Integration

### Option A Impact (Shared Infrastructure)
```
They generate through YIELD: $6,143/year
You bill them for hosting: $84-180/year
Their net YIELD value: $6,143 - $84 = $6,059/year (saves 98.6%)

You make from hosting: $30-126/year
Plus: Consulting on automations (separate)
```

### Option B Impact (Dedicated Server)
```
They generate through YIELD: $6,143/year
They pay Hetzner directly: $54/year
You bill for management: $0-360/year

They save vs DigitalOcean: $464 - $54 = $410/year minimum
You bill additional management if desired: $0-360/year
```

---

## Recommendation for Results Learning

### Best Option: **OPTION A with Scenario A2**

**You bill them: $10/month ($120/year)**

**Rationale**:
1. ✅ Still cheaper than DigitalOcean ($27/month = $324/year)
2. ✅ You get reasonable margin ($66/year profit per client)
3. ✅ You scale easily (same server handles 5-10 clients)
4. ✅ You control infrastructure (can optimize, add features)
5. ✅ At 5 clients: $330/year profit from hosting alone
6. ✅ Clean billing: One line item on their invoice
7. ✅ Flexibility: Can upgrade server as they grow

### Alternative: **OPTION B with Scenario B3**

**Setup: $500 | Monthly: $30 ($360/year)**

**Rationale**:
1. ✅ They own their infrastructure (independence)
2. ✅ You provide premium support (higher value)
3. ✅ Higher perceived value ($500 setup shows professional service)
4. ✅ Better for larger deployments
5. ✅ They feel ownership, more long-term commitment

---

## Pitch to Results Learning

### Option A Pitch (Shared Infrastructure)
> "We host your n8n instance on our managed infrastructure at $10/month. This is a 96% discount from DigitalOcean ($27/month) and includes monitoring, backups, and updates. You pay a simple fixed fee, we handle all infrastructure complexity."

### Option B Pitch (Dedicated Server)
> "You get your own dedicated Hetzner server ($4.50/month, billed directly to you). We set it up ($500 one-time) and manage it monthly ($30/month) with weekly monitoring and priority support. Full independence, professional management."

---

## Final Recommendation

**Start with Option A, Scenario A2**:

```
You Bill Results Learning: $10/month ($120/year)

Results Learning Sees:
- Infrastructure: $120/year (64% cheaper than DigitalOcean)
- YIELD Revenue: $6,143/year
- Total Value: $6,023/year net savings

You Get:
- Monthly Revenue: $10/month = $120/year
- Your Infrastructure Cost: $4.50/month = ~$54/year
- Your Profit: $120 - $54 = $66/year (per client)
- At 5 clients: $330/year profit from hosting
- At 10 clients: $660/year profit from hosting
- Minimal management overhead (1-2 hours/month total)
```

### Transition Path

Year 1: Option A ($10/month billing)
- Prove the concept
- Build trust
- Monitor performance

Year 2+: Option A or B
- If happy with shared: Keep Option A
- If need more control: Offer migration to Option B (dedicated server)
- Either way: Ongoing revenue for you

---

## Detailed Invoice Examples

### Option A Invoice (Monthly)
```
Results Learning - Invoice #001
Period: January 2026

YIELD Automation Framework Services:
  Kristen Reporting Automation      Hours Saved: 19.67    €118.02
  Katie Data Entry Automation       Hours Saved: 57.67    €346.02
  Jennifer Email Automation         Hours Saved: 10.00    €30.00
  Nikki Template Automation         Hours Saved: 6.00     €18.00
  ─────────────────────────────────────────────────────────────
  Subtotal (YIELD Services)                                €512.04

Infrastructure & Hosting:
  n8n Hosting & Management          Monthly                $10.00
  ─────────────────────────────────────────────────────────────
  Subtotal (Infrastructure)                               $10.00

TOTAL DUE:                                                €522.04
```

### Option B Invoice (Monthly)
```
Results Learning - Invoice #001
Period: January 2026

YIELD Automation Framework Services:
  Kristen Reporting Automation      Hours Saved: 19.67    €118.02
  Katie Data Entry Automation       Hours Saved: 57.67    €346.02
  Jennifer Email Automation         Hours Saved: 10.00    €30.00
  Nikki Template Automation         Hours Saved: 6.00     €18.00
  ─────────────────────────────────────────────────────────────
  Subtotal (YIELD Services)                                €512.04

Managed Services:
  n8n Setup & Management            Monthly                $30.00
  ─────────────────────────────────────────────────────────────
  Subtotal (Managed Services)                             $30.00

Infrastructure (Billed by Hetzner):
  Hetzner CAX11 Server              Billed separately     $4.50
  (Results Learning pays Hetzner directly)
  ─────────────────────────────────────────────────────────────

TOTAL FROM RESULTS LEARNING:                              €542.04
(Plus Hetzner $4.50/month charged directly to them)
```

---

## Decision Framework

| Factor | Option A | Option B |
| --- | --- | --- |
| **Setup Speed** | 30 min | 1-2 hours |
| **Your Upfront Cost** | $0 | $0 (time only) |
| **Your Monthly Revenue** | $10 | $30 |
| **Their Monthly Cost** | $10 | $4.50 + $30 |
| **Your Markup** | 122% | N/A (market rate) |
| **Scalability** | 10+ clients/server | 1 client/server |
| **Support Burden** | Low (shared) | High (dedicated) |
| **Profit at 5 Clients** | $330/year | $1,500/year |
| **Best For** | Growing client base | Premium positioning |

---

## Recommendation

**Go with Option A ($10/month billing)**

1. Lower risk (shared infrastructure)
2. Easier to scale (add clients to same server)
3. Reasonable profit margin per client ($66-150/year)
4. Clean, simple billing
5. Low support burden
6. Can upgrade to Option B later if they want

**One-time proposal email**:
> "We can host your n8n automation platform for $10/month on our managed infrastructure, fully monitored and backed up. This covers all infrastructure, monitoring, backups, and updates. For comparison, DigitalOcean would charge $27/month for equivalent service. Does $10/month work for your budget?"

---

*Cost Estimation & Billing Options v1.0*
*Results Learning - January 2026*
