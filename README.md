# Lamatic <> Nextra Docs Starter Kit

A powerful documentation template combining [Nextra](https://nextra.site)'s modern documentation framework with [Lamatic](http://lamatic.ai)'s instant Chatbot for dynamic, interactive documentation with AI-powered chat features.

![Screenshot](./public/screenshot.png)

## Features

- 🤖 **AI-Powered Chat**: Embedded Lamatic chatbot that helps users find information and answers questions.
- 🔄 **Auto-Indexing**: Automatic documentation indexing through GitHub Actions.
- 📚 **RAG Integration**: Retrieval-Augmented Generation for accurate, context-aware responses.
- ⚡ **Real-time Updates**: Documentation and chatbot automatically stay in sync.

The starter kit includes two key flows:
1. A documentation indexing pipeline that maintains an up-to-date vector store of your content (found in the `flows/index-github-actions.yaml` file).
2. A document-aware chatbot that leverages your documentation to provide intelligent responses (found in the `flows/document-chatbot.yaml` file).

## Setup Steps

### 1. Requirements

1. Deploy this project on Vercel:

    [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FLamatic%2Flamatic-nextra-starter-kit.git&project-name=lamatic-nextra-starter-kit&repository-name=lamatic-nextra-starter-kit)

2. Set up a Lamatic.ai account and project. [Signup](https://studio.lamatic.ai/signup) if you don’t have one already.
3. Obtain API keys with any LLM providers (e.g., OpenAI, Anthropic).

### 2. Setup Indexing Flow

![CleanShot 2024-11-06 at 14 13 22@2x](https://github.com/user-attachments/assets/efbb5c35-5b26-4fbf-aa67-4807e2c8b320)

1. Deploy the Indexing Flow to your Lamatic.ai project.

    [![Add to Lamatic](https://api.lamatic.ai/storage/v1/object/public/icons/lamatic-deploy-icon.svg)](https://studio.lamatic.ai/_?templateSlug=index-github-actions)

2. Obtain the webhook endpoint from the webhook trigger node.
3. Add this endpoint to your GitHub secrets as `WEBHOOK_URL`.
4. Configure the [GitHub action](https://github.com/marketplace/actions/send-file-changes-to-lamatic-webhook) in `.github/workflows/index-to-lamatic.yaml`.
5. Trigger a GitHub action by modifying a `.mdx` file and observe the GitHub Actions run.
6. Fetch events in the webhook node. Optionally, save a sample payload for future testing.
7. Complete the required configurations in each node.
8. Test the flow to populate records in your vector store.

### 3. Setup Chatbot

![CleanShot 2024-11-06 at 14 13 22@2x](https://github.com/user-attachments/assets/312fab99-842d-4c26-9f8b-e0e97cefd7aa)

1. Add the Chatbot Flow to your Lamatic.ai project.

    [![Add to Lamatic](https://api.lamatic.ai/storage/v1/object/public/icons/lamatic-deploy-icon.svg)](https://studio.lamatic.ai/_?templateSlug=document-chatbot-widget)

2. Add your Vercel deployment domain to the allowed domains in the Trigger Chat node.
3. Set up AI nodes for Database and Models.
4. Test the flow in the debugger by asking questions.
5. Retrieve the setup configuration and add them as environment variables on Vercel. 
Customize your chat widget using the following Env values.

| Variable                          | Explanation                             | Example                      | Required |
|-----------------------------------|-----------------------------------------|------------------------------|----------|
| `NEXT_PUBLIC_LAMATIC_BOT_NAME`     | Display name for your chatbot           | `"My Chatbot"`               | Yes      |
| `NEXT_PUBLIC_LAMATIC_API_URL`      | URL for accessing the Lamatic API       | `"https://api.lamatic.ai"`   | Yes      |
| `NEXT_PUBLIC_LAMATIC_FLOW_ID`      | Unique flow ID of your Lamatic chatbot  | `"flow_12345"`               | Yes      |
| `NEXT_PUBLIC_LAMATIC_CHAT_HEADER_BG_COLOR` | Header background color of the chatbot (CSS color) | `"black"` or `"#FFFFFF"` | No (default: black) |
| `NEXT_PUBLIC_LAMATIC_SUGGESTIONS`  | Initial prompts for users (comma-separated) | `"Help, Contact, FAQ"`      | No       |
| `NEXT_PUBLIC_LAMATIC_IMAGE_URL`    | URL for chatbot’s image                 | `"https://example.com/logo.png"` | No (default: Lamatic logo) |
| `NEXT_PUBLIC_LAMATIC_POSITION`     | Position of the chatbot on the screen   | `"right"` or `"left"`        | No (default: right) |
| `NEXT_PUBLIC_LAMATIC_FLOATING_BUTTON_ICON` | Icon for the floating button          | `"https://example.com/icon.png"` | No (default: help-circle.svg) |
| `NEXT_PUBLIC_LAMATIC_ERROR_MESSAGE` | Message displayed on error             | `"An error has occurred"`    | No (default: "An error has occurred") |

### 4. Deploy 

1. Activate both flows.
2. Redeploy on Vercel.
3. The chatbot should now be live.

With this setup, any updates to your documentation will automatically index to Lamatic.

> **Note**: After the first run, change the `mode` in the GitHub action index to `incremental` to only index new pages.

## Troubleshooting 

1. **Chatbot Errors**: Verify environment variables on Vercel and allowed domains in the Lamatic Flow.
2. **Indexing Issues**: Confirm GitHub Action secrets are set and GitHub Action is running.
3. **Webhook Data Issues**: Check if GitHub Action is triggering and sending payloads. Modify a file to retrigger if needed.

## License

This project is licensed under the MIT License.
