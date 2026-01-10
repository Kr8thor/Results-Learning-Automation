# LLM API Costs for Results Learning
## When to Use AI & Which Services to Choose

---

## Quick Answer

**Short version**: LLM APIs are optional and only needed for specific workflows.

**Cost if used**: $0-50/month for Results Learning's use case.

---

## What LLM APIs Do

LLM (Large Language Model) APIs can:
- ✅ Summarize text (email, documents)
- ✅ Classify/categorize content
- ✅ Extract information from unstructured data
- ✅ Generate templates or responses
- ✅ Translate text
- ✅ Research/find information online

---

## Results Learning's Potential Use Cases

### 1. Jennifer's Email Triage (Currently No LLM Needed)
**Current approach**: Route emails by sender, subject line, label
**Could enhance with LLM**: Classify email importance, extract action items
**Cost if added**: $0.001-0.005 per email (negligible)

### 2. Cyle's Data Entry Reduction (Could Benefit from LLM)
**Current approach**: Manual data entry from emails/forms
**With LLM**: Extract structured data from unstructured emails
**Cost if added**: $0.005-0.01 per email processed

### 3. Katie's Data Sync (No LLM Needed)
**Current approach**: Consolidate structured data across sheets
**LLM would add**: Duplicate detection, data quality analysis
**Cost if added**: $0.01-0.05 per sync cycle

### 4. Kristen's Weekly Reporting (No LLM Needed)
**Current approach**: Auto-generate reports from Teachworks data
**LLM could add**: Better formatting, summary generation
**Cost if added**: $0.05-0.10 per report

### 5. Nikki's RFP Templates (Could Benefit from LLM)
**Current approach**: Auto-populate template from form data
**With LLM**: Generate custom sections based on RFP requirements
**Cost if added**: $0.10-0.50 per RFP

---

## LLM Provider Options

### Option 1: OpenAI (Most Popular)
**Models**:
- GPT-4 (advanced): $0.03-0.06 per 1K tokens
- GPT-4 Turbo: $0.01-0.03 per 1K tokens
- GPT-3.5 Turbo: $0.0005-0.0015 per 1K tokens

**For Results Learning**:
- Email classification: $0.0005 per email (GPT-3.5)
- Data extraction: $0.001-0.005 per item (GPT-3.5 or 4)
- Template generation: $0.01-0.05 per template (GPT-4)

**Monthly cost** (if using):
- Light usage (100 emails/month): ~$0.05
- Moderate usage (1,000 items/month): ~$1-5
- Heavy usage (10,000 items/month): ~$10-50

### Option 2: Anthropic Claude
**Cost**:
- Claude 3 Opus: $0.015 per 1K input, $0.075 per 1K output
- Claude 3 Sonnet: $0.003 per 1K input, $0.015 per 1K output
- Claude 3 Haiku: $0.00025 per 1K input, $0.00125 per 1K output

**Best for Results Learning**: Claude Haiku (cheapest, fast enough for most tasks)

**Monthly cost**:
- Light usage: ~$0.10-0.50
- Moderate usage: ~$1-10
- Heavy usage: ~$10-50

### Option 3: Google Gemini
**Cost**:
- Gemini Pro: $0.000125 per 1K input tokens
- Free tier: 60 requests per minute

**Best for**: Simple tasks (classification, summarization)

**Monthly cost**:
- Light usage: FREE (within quota)
- Moderate usage: $0.01-0.50
- Heavy usage: $0.50-5

### Option 4: Open Source (Self-Hosted)
**Options**: Llama 2, Mistral, others
**Cost**: $0 (just server resources)
**Trade-off**: Slower, less accurate than commercial models

---

## Recommended Strategy for Results Learning

### Phase 1 (Weeks 1-8): No LLM APIs
**Why**: Not needed for initial workflows
- Email triage: Use simple rules (sender, subject, labels)
- Data sync: Use standard data operations
- Templates: Use standard string replacement

**Cost**: $0

### Phase 2 (Weeks 9-16): Optional LLM Enhancement
**If you want to add AI**:

**Best option for you**: Google Gemini or Claude Haiku
- Cheapest options
- Fast enough for n8n workflows
- Good accuracy for classification/extraction

**Cost**: $0-10/month for moderate usage

**Recommended use**:
1. **Email importance classification** (Jennifer)
   - Cost: ~$0.005 per email
   - Benefit: Prioritize urgent emails
   - Usage: ~100 emails/month = $0.50/month

2. **Data extraction from emails** (Cyle, if implementing)
   - Cost: ~$0.01 per item
   - Benefit: Auto-extract structured data
   - Usage: ~500 items/month = $5/month

3. **Template generation** (Nikki)
   - Cost: ~$0.05-0.20 per RFP
   - Benefit: Custom proposal sections
   - Usage: ~10 RFPs/month = $1/month

**Total Phase 2 LLM cost**: ~$5-10/month

### Phase 3 (Month 6+): Scale as Needed
- Expand AI usage to more workflows
- Cost scales with usage
- Never exceeds $50-100/month

---

## Cost Comparison: LLM Providers

| Provider | Cost/1K Tokens | Best Use | Monthly (100 ops) |
|---|---|---|---|
| **Google Gemini** | $0.000125 | Simple tasks | FREE-$1 |
| **Claude Haiku** | $0.0025 | Medium tasks | $0.25-2 |
| **GPT-3.5 Turbo** | $0.0005 | Any task | $0.05-1 |
| **Claude Sonnet** | $0.003 | Complex tasks | $0.30-3 |
| **GPT-4 Turbo** | $0.01 | Advanced tasks | $1-10 |
| **Claude Opus** | $0.015 | Best accuracy | $1.50-15 |

**Recommendation for Results Learning**: Start with Google Gemini (free tier) or Claude Haiku ($0.25-2/month).

---

## How LLMs Work in n8n

### Setup (Simple)
1. Get API key from provider
2. Add API key to n8n credentials
3. Use LLM node in workflow
4. Pass text to LLM node
5. Use response in next step

### Example: Email Classification
```
Gmail → Get email content → LLM node
  (Classify as: urgent/normal/low)
→ Route based on classification
```

### Cost for 100 emails/month
```
Email content: ~300 tokens per email
100 emails × 300 tokens = 30,000 tokens
30,000 tokens × $0.0005/1K = $0.015/month (GPT-3.5)
or
30,000 tokens × $0.000125/1K = $0.004/month (Gemini)
```

---

## What You Absolutely Don't Need (Save Money)

❌ **Don't use LLM for**:
- Simple routing (use rules instead)
- Structured data consolidation (use standard functions)
- Report generation (use templates)
- Form responses (direct to sheets)

✅ **Do use LLM for**:
- Extracting info from unstructured text
- Classifying/categorizing content
- Generating custom responses
- Summarizing documents

---

## Full 8-Week Cost With Optional LLMs

### Infrastructure (Required)
```
Hetzner Server:    $4.50/month × 2 = $9
Domain:            $1.67/month × 2 = $3.34
─────────────────────────────
Infrastructure:    $12.34
```

### YIELD Services (Required)
```
Estimated YIELD:   €200-300
```

### LLM APIs (Optional)
```
If added in Week 5: $0-10
If not used:        $0
```

### Total 8-Week Cost
```
Without LLM:       ~$240-360
With light LLM:    ~$250-380
With moderate LLM: ~$280-420
```

---

## My Recommendation

### For Week 1-8 Deployment
**Skip LLM APIs entirely.**

**Why**:
- Not needed for initial workflows
- Adds complexity
- Workflows already save 15+ hours/week
- Can add later if needed

### For Phase 2 (Weeks 9-16)
**Consider adding LLM if**:
- Cyle's data entry reduction is high priority
- Want to auto-research complex emails
- Need intelligent data quality checks

**Start with**: Google Gemini (free tier)
- Classification: Free (60 req/min)
- Extraction: $0-1/month

---

## Decision Matrix

### Do You Need LLMs?

| Question | Yes → Use LLM | No → Skip LLM |
|---|---|---|
| Do you have unstructured email/text? | ✅ | ❌ |
| Do you want to auto-extract info? | ✅ | ❌ |
| Do you need smart categorization? | ✅ | ❌ |
| Is your data already structured? | ❌ | ✅ |
| Are simple rules sufficient? | ❌ | ✅ |
| Want to keep costs minimal? | ❌ | ✅ |

**For Results Learning**: Column 2 (skip LLM in Phase 1)

---

## Cost Summary

### Definite Costs (No Choice)
```
Hetzner Server:    $4.50/month
Domain:            $1.67/month
YIELD Services:    €3-10/hour (actual time saved)
─────────────────────────────
MONTHLY:           $6.17 + YIELD charges
YEARLY:            ~$74 + YIELD services
```

### Optional Costs (Your Choice)
```
LLM APIs:          $0-50/month (completely optional)
Advanced features: $0-100/month (completely optional)
```

### If You Use All Optional Services
```
Monthly:           $60-100
Yearly:            $720-1200
```

**But you don't need these to get 15+ hours/week savings.**

---

## Bottom Line

### Phase 1 (Week 1-8)
- **Infrastructure**: $4.50/month (Hetzner)
- **Google APIs**: $0
- **LLM APIs**: $0 (not needed)
- **Total**: ~$56/month (infrastructure + YIELD)

### Phase 2 (Week 9+, Optional)
- Add LLM APIs only if beneficial
- Cost: $0-50/month
- Benefit: Enhanced automation capabilities

### Year 1 Full Cost
```
Infrastructure:    $120-360 (depending on option)
YIELD Services:    $3,000-4,000
LLM (optional):    $0-600
Google APIs:       $0
─────────────────────────────
TOTAL:             $3,120-4,960
```

---

*YIELD Framework™ - LLM API Costs Explained*
*Results Learning - Optional AI Enhancement*
*January 2026*
