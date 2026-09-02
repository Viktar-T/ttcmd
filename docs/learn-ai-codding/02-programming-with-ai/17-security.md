# Security of working with AI

**Source (RU):** Безопасность работы с ИИ  
**Path:** Home → Basics of Programming with AI → Security  
**Published:** ~4 weeks ago

## Contents

- Vulnerabilities of agentic tools
- Vulnerabilities of libraries
- Vulnerabilities of MCP servers
- Vulnerabilities of agentic browsers
- A new class of viruses
- Certifications and standards
- A few words on regulation
- Fears and myths
- Related club content

This chapter is a collection of the “minimum necessary” knowledge for working safely with AI tools. We will go through real threats, industry cases, and a short checklist worth starting to apply today.

Related Basic Theory (research field, not day-to-day tooling): [AI safety](../01-basic-theory/05-horizons/12-ai-safety.md).

## Vulnerabilities of agentic tools

An agent is not just a chat. It is a system that can read files, go to the internet, call tools (CLI, databases, APIs), run code, and change your project. From that come the main risks of using agents:

Agents can run sketchy commands without your explicit confirmation. Some tools work from an allowlist — they only run commands you have explicitly permitted. Far from all tools work that way, and you need to watch for it.

Agents can run code you have not seen and have not reviewed. For example, if the agent generates code for your project, it can run that code without your explicit confirmation. It is enough to have permission to run an interpreter through the console, which is usually given by default, because agents run code for testing.

Agents can send confidential data to external services while they work. So watch what you pass to agents. Trusted and popular services are less likely to use your data maliciously — which you cannot say about small and open-source projects.

Agents can treat instructions hidden in data / pages / scripts as their own. That is called **prompt injection** and **indirect prompt injection**. So be twice as careful about what you pass to agents.

**Data exfiltration:** leaking secrets through logs, agent memory, and connected connectors (mail, disk, task tracker). If a hole appears in the agent (for all kinds of reasons — attackers do not sleep), it can be used to pull all of that data out.

How to reduce the risk:

- Read the code the agent generates before you use it.
- Do not let the agent act fully autonomously: set limits and rules, allowlists if the settings allow it.
- Watch how the agent is executing the task.
- Use sandboxes for code, or an isolated environment, if you can.
- Do not use unverified or little-known tools.
- If you need privacy — use local models and tools in an isolated environment.

See also [agentic code generation](06-agentic-code-generation.md), [AI in the terminal](15-ai-in-the-terminal.md), and [skills and subagents](11-skills-and-subagents.md).

## Vulnerabilities of libraries

Open (and not only open) libraries are more and more often becoming a channel for new attacks. Attackers plant malware in popular libraries, and our AI tools use those libraries when they write code — which sometimes goes unnoticed. What to watch for:

**Typosquatting** — creating a malicious package with a popular name, but with a typo in the name. The victim installs that package by accident; it does the main job, and the malicious work in the background.

**Dependency confusion** is infection of dependencies, when an already popular library is infected from the inside by a malicious dependency (for example, a contributor fell for typosquatting). Even large libraries are hit by dependency confusion (this is also called a **supply chain attack**). For example, you can read about [this case](https://pytorch.org/blog/compromised-nightly-dependency/) (PyTorch nightly / `torchtriton` on PyPI, December 2022).

How to reduce the risk:

- Watch the dependencies AI pulls into the project.
- Watch the news about new library vulnerabilities (for example, through the [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) list).

## Vulnerabilities of MCP servers

As the [MCP](07-model-context-protocol.md) protocol grows more popular, more and more vulnerabilities appear in MCP servers. Any MCP server is, at heart, program code running on your machine, or in the cloud (in the case of Remote MCP). Both cases can be dangerous:

**Local MCP** — can run arbitrary commands and code, because they start right on your computer, sometimes with root privileges (yikes!).

**Remote MCP** — can leak data.

Social engineering + MCP = a new attack vector. An attacker creates an MCP server that looks genuine, but actually does something bad. Such servers can be made specifically for a victim or a company, to raise the odds that this server lands on the victim’s machine.

How to reduce the risk:

- Watch the MCP servers you use. Choose verified and popular servers.

## Vulnerabilities of agentic browsers

We, as developers and fans of AI tools, have fallen in love with AI browsers. Modern AI browsers are starting to get agentic behavior — they can automate their own actions, and therefore load into context the content of the pages they visit. That is where the problem called **prompt injection** sits.

An attacker can hide prompts in the DOM / meta tags / images / documents of web pages, and the agent will obediently execute them: open a wallet, dump search history, cookies, send mail in your name, and so on.

How to reduce the risk:

- Do not let the browser act fully on its own; set limits and rules if the settings allow it.
- Watch the sites your browser agent visits.

See also [AI in the browser](16-ai-in-the-browser.md).

## A new class of viruses

We all work on computers, so it is useful to understand how viruses that can infect our machines are evolving — especially when that evolution is driven by AI and the tools around it. Two interesting cases:

**Using local models for polymorphic code generation.** Yes — viruses are learning to use small local models to generate their own code, like a cancer in a human. Read about the ransomware case found by ESET [here](https://www.welivesecurity.com/en/ransomware/first-known-ai-powered-ransomware-uncovered-eset-research/) (PromptLock).

**Using AI tools for code generation.** The idea is roughly the same as the case above, but here the virus used not just models, but whole AI tools such as Claude Code CLI or Gemini CLI to reproduce its own code. Here is a case with the popular npm library [nx](https://snyk.io/blog/weaponizing-ai-coding-agents-for-malware-in-the-nx-malicious-package/) (the s1ngularity supply-chain attack).

How to reduce the risk:

- Watch the “hygiene” of your computer.
- Watch the news on the topic.

## Certifications and standards

Sometimes, to be more confident in the security of an AI tool, you can look at its certifications and standards. What to pay attention to:

### SOC 2

[SOC 2](https://www.aicpa-cima.com/topic/audit-assurance/audit-and-assurance-greater-than-soc-2) (System and Organization Controls 2) is a data-security standard developed by the American Institute of Certified Public Accountants (AICPA). It sets requirements for information controls at service providers, to guarantee security, availability, processing integrity, confidentiality, and privacy of client data. SOC 2 is not a certificate; it is an audit report from independent experts confirming that the company implements and effectively manages the necessary control systems.

SOC 2 can be Type I or Type II:

- **Type I** — a one-time audit, an audit at a point in time.
- **Type II** — an audit over a period, made of several audits during a defined window (usually 3–12 months).

So SOC 2 is not an AI-specific certification standard, but it can be used to assess the security of a company’s data and processes, and in practice it has become one of the security standards for AI tools.

### ISO/IEC 42001

[ISO/IEC 42001](https://www.iso.org/standard/81230.html) is an international standard that defines requirements for creating, implementing, maintaining, and continually improving AI management systems (AIMS) in organizations. It is intended for organizations that provide or use AI-based products or services, ensuring responsible development and use of AI systems.

### ISO/IEC 23894

[ISO/IEC 23894](https://www.iso.org/standard/77304.html) is a standard with recommendations on managing AI-related risks for organizations that develop, produce, implement, or use AI-based products, systems, and services. It also describes processes for effectively implementing and integrating AI-related risk management.

The standards and audits above can be a good support for a company that wants to adopt this or that AI tool, but unfortunately in practice standardization does not keep up with the speed of new AI threats.

## A few words on regulation

And what about regulation from states? They can also affect how AI tools develop and how safe they are. Here it is even more complicated, because laws are introduced very slowly and carefully. For now it is worth knowing about two of the largest regulatory documents:

### EU: AI Act

The [AI Act](https://artificialintelligenceact.eu/) is legislation regulating AI (companies, models, tools, services) on the territory of the European Union. It is being rolled out in stages over several years (from 2024 to 2026). It is more a restrictive set of rules and laws, with the emphasis on regulating tools and models and raising user literacy, plus regimes for high-risk systems. A lot of mandatory documentation, risk assessments, control of model providers.

### US: AI Action Plan

The [AI Action Plan](https://www.whitehouse.gov/presidential-actions/2025/07/winning-the-race-americas-ai-action-plan/) is a plan of action for developing AI in the United States, prepared by the US administration in 2025, with an emphasis on deregulation and speeding up innovation. Unlike the AI Act, this plan is not a legislative act; it is an action plan for companies, while setting the “rules of the game” in favor of companies and consumers of AI.

### US: NIST AI RMF

Also in the US there is the [NIST AI RMF](https://www.nist.gov/itl/ai-risk-management-framework) (National Institute of Standards and Technology AI Risk Management Framework), which is de facto the standard for assessing the safety of AI systems in companies.

**Takeaway:** in the EU a “regulator-first” approach with a clear timeline dominates; in the US, “guidelines + agency practice” dominates. Business in the EU should align processes under the AI Act + ISO 42001, and in the US — apply NIST AI RMF.

## Fears and myths

### “They will steal my code”

The essence of this rumor / myth / fear is that some developers and companies believe model and tool vendors will steal the code of their projects, make competitors, sell it, and so on.

In theory — it is possible, but in practice — there are no precedents. At least none that involved well-known companies. Behavior of that kind would be treated as unfair dealing, which would bring a pile of reputational and legal costs. On top of that, the public offers and documents of such companies usually spell out how they use data (Privacy Policy).

So, to keep problems from appearing, the advice is: read the Privacy Policy, subscription terms and contracts, look at completed audits (you want SOC 2 at minimum) and the vendor’s standardizations, and do not use solutions from unverified companies and developers.

### “They leak my data”

The essence here is that many people fear that data they send to models / tools will become available to third parties.

You can say that this is both yes and no. On the one hand, every self-respecting company writes in public offers that data will not be used by third parties. On the other hand:

- First, companies are not insured against breaches.
- Second, people from government and defense have long sat in the management of large AI companies; key AI providers have become a strategically important resource for states, so the author does not rule out that government agencies may have access to data from these systems (that would be very logical — we know this movie).

### “They will train on my data”

Although companies that provide AI models and tools write everywhere, explicitly, that they do not use user data to train models, society has the opinion that this is not so.

The author is of the view that data is always used for further training of models, so it is better not to throw into chats what you really would not want anyone to find out. Why?

- First, there is very little data, and it would be foolish not to use what is already sitting right under their nose.
- Second, as in the previous fear, do not forget that these companies are critically important for states, and so they may have “exemptions” unavailable to ordinary mortals.
- Third, proving that data was used for further training of models is very hard.

In the end, even if models are trained on our data, that does not mean they absorb that data verbatim and will be able to reproduce it exactly (training does not work that way). So just watch what you write in chats, do not throw in extra, and everything will be fine.

### “The US is fine, China is sketchy”

The author often hears that people prefer to use American models and services instead of Chinese ones (yes, the US and China are the two leaders in AI), because they are supposedly safer from the point of view of special services using them. And here the author does not fully agree.

In the US and in China and in the EU and in other countries, the core AI companies are critically important for the state. So everywhere they will get closer control and attention from special services. The author would say: if you already have doubts, it is better to use services and models of countries that are less likely to reach you 😉

### “You need to be polite with AI”

You do. Say hello to the chat and be polite with it; train “ecological” communication. Nobody will be worse off for it, and a future AGI might treat you better than planned 😁

💡 This chapter was about how not to put yourself at risk. On how to use AI from the other side — to find vulnerabilities in your own code and infrastructure — read [Security testing](18-security-testing.md).

## Related club content

- 2024.11.28 / Working with data through AI tools / Lex Kartynnik
