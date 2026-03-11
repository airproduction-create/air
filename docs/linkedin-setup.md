# LinkedIn API Setup Guide

This guide walks you through creating a LinkedIn Developer App, obtaining an access token with company page posting permissions, and finding your Organization ID.

---

## Step 1: Create a LinkedIn Developer App

1. Go to [developer.linkedin.com/apps](https://developer.linkedin.com/apps)
2. Click **Create App**
3. Fill in:
   - **App name:** AIR CO Publisher
   - **LinkedIn Page:** Select your AIR CO company page
   - **App logo:** Upload your logo
4. Click **Create App**

---

## Step 2: Request Required Products

In your app dashboard, go to the **Products** tab and request access to:

- **Share on LinkedIn** — enables posting to personal feeds
- **Marketing Developer Platform** — enables posting to company pages

> The Marketing Developer Platform may require a review process (1–5 business days). You will receive an email when approved.

---

## Step 3: Configure OAuth Scopes

Once both products are approved, go to **Auth** > **OAuth 2.0 scopes** and ensure these are listed:

| Scope | Purpose |
|-------|---------|
| `w_organization_social` | Post to company page |
| `r_organization_social` | Read company page posts |
| `rw_organization_admin` | (optional) Admin access |

---

## Step 4: Generate an Access Token

LinkedIn uses 3-legged OAuth. The simplest way is to use the **OAuth Token Tools** in your app dashboard:

1. In your app, go to **Auth** > **OAuth 2.0 tools**
2. Click **Create token**
3. Select scopes: `w_organization_social`, `r_organization_social`
4. Complete the OAuth flow (you will be redirected to LinkedIn to approve)
5. Copy the **Access Token**

> **Token expiry:** Standard access tokens expire after **60 days**. To avoid this, request a long-lived token or set up a refresh token flow (see Step 6).

Set the token in your environment:
```
LINKEDIN_ACCESS_TOKEN=AQX...your_token_here
```

---

## Step 5: Find Your Organization ID

Your Organization ID is the numeric ID of your AIR CO LinkedIn company page.

**Method 1 — From the URL:**
1. Go to your company page on LinkedIn
2. Click **Admin tools** > **Edit page**
3. Look at the URL: `https://www.linkedin.com/company/12345678/admin/`
4. The number (`12345678`) is your Organization ID

**Method 2 — Via API:**
```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  "https://api.linkedin.com/v2/organizationalEntityAcls?q=roleAssignee&role=ADMINISTRATOR&projection=(elements*(organizationalTarget~(id,name)))"
```
Look for `"id"` in the response.

Set it in your environment:
```
LINKEDIN_ORGANIZATION_ID=12345678
```

---

## Step 6: Test the Integration

Test that your token and org ID work with a simple curl:

```bash
curl -X POST "https://api.linkedin.com/v2/ugcPosts" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -H "X-Restli-Protocol-Version: 2.0.0" \
  -d '{
    "author": "urn:li:organization:YOUR_ORG_ID",
    "lifecycleState": "PUBLISHED",
    "specificContent": {
      "com.linkedin.ugc.ShareContent": {
        "shareCommentary": { "text": "Test post from AIR CO API setup. Deleting shortly." },
        "shareMediaCategory": "NONE"
      }
    },
    "visibility": {
      "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC"
    }
  }'
```

If successful, you will receive a `201 Created` response with a post URN in the `x-restli-id` header.

---

## Step 7: Keeping Your Token Fresh (Recommended)

Access tokens expire after 60 days. Options to handle this:

### Option A — Manual refresh (simple)
Set a calendar reminder every 50 days to regenerate your token via the OAuth Token Tools in the app dashboard, then update `LINKEDIN_ACCESS_TOKEN` in your Netlify environment variables.

### Option B — Refresh token flow (automated)
LinkedIn supports refresh tokens for longer token lifetimes. Contact LinkedIn's Partner Programme if this is needed at scale.

### Option C — Netlify environment variable update via API
Use the Netlify API to programmatically rotate the token from a separate job:
```bash
curl -X PATCH "https://api.netlify.com/api/v1/accounts/{account_id}/env/LINKEDIN_ACCESS_TOKEN" \
  -H "Authorization: Bearer {netlify_personal_access_token}" \
  -d '{"value": "new_token_value"}'
```

---

## Supabase Storage: Create the linkedin-images Bucket

Before the first publish, create the storage bucket for generated images:

1. Go to your Supabase project > **Storage**
2. Click **New bucket**
3. Name: `linkedin-images`
4. Set to **Public** (so LinkedIn can fetch the image URL)
5. Click **Create**

---

## Environment Variables Summary

| Variable | Where to find it |
|----------|-----------------|
| `LINKEDIN_ACCESS_TOKEN` | LinkedIn Developer App > Auth > OAuth Token Tools |
| `LINKEDIN_ORGANIZATION_ID` | Company page URL or API (see Step 5) |
| `FREEPIK_API_KEY` | freepik.com/api |
| `RESEND_API_KEY` | resend.com > API Keys |
| `NOTIFICATION_EMAIL` | Your email address |
| `SLACK_WEBHOOK_URL` | Slack App > Incoming Webhooks |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase > Settings > API > service_role |

All variables are set in **Netlify > Site Settings > Environment Variables**.
