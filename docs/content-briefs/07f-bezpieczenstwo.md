# Brief — 7f · Bezpieczeństwo: sekrety, dane, prompt injection

| | |
| --- | --- |
| Lesson | `content/moduly/07-testy-i-jakosc/bezpieczenstwo.mdx` · `order: 6` · 2 h |
| Written | 2026-09-10, by write-lesson · approved: (blank) |
| Mode | semi-supervised |
| Research | `research-07-testy-jakosc-przeglad.md` §5 (whole) |
| Drafted | 2026-09-10 |

## Reader position

As 7e, and it is the accumulation that makes this lesson possible. By now the
student has, **in their own life and not as an example**: a public repository
with months of history; an agent with permission to edit files and run commands;
a CI workflow that runs on a machine they do not own; a classmate's code on
their disk; and a pull request from somebody else in their own repository. Only
now do all three parts of the trifecta exist for this reader — which is why this
lesson is last and not first.

Has never: used an API key, published anything with a user outside the room,
had a security incident, or thought about what „publiczne” means beyond „widać”.

## Carrying question

> Wszystko, co w tym module włączyłeś, ma tę samą właściwość: działa bez ciebie.
> Co jeszcze działa bez ciebie — i czego już nie da się cofnąć?

## Anchor

**The student's own public repository**, examined three ways in one lesson: what
is already in its history, what happens to it if they delete it, and what an
agent standing in front of it can be told to do by somebody who is not them.

## Shape

**Narrative with two short procedures.** Two hours, three moves, no attempt at
a survey of security. The lesson is deliberately narrow: **one thing that is
already true (the history), one habit (where a secret goes), one mechanism
(prompt injection)** — and it says out loud that it is narrow.

## Arc

| # | Heading (Polish) | Move | The anchor here |
| --- | --- | --- | --- |
| 0 | (opening) | Four checks that run without you — and one more thing that has been running without you since September: your repository, in public | The repository's history |
| 1 | To, co raz wypchnięte, jest wypchnięte | GitHub's own sentences: removing the secret, pushing a new commit, or deleting and recreating the repository „**do not prevent the secret from being exploited**”; the commit stays reachable in forks, in cached views, through pull requests. And: „**Deleting a public repository will not delete any forks**”; a repository made private leaves its public forks public | 7e just created a fork of their repository. It is now the example |
| 2 | Klucz, którego nigdy nie miałeś — i dlaczego to kwestia czasu | Why a student with no API key today has one in Moduł 9. The measured scale: 28,65 million new secrets in public commits in 2025, +34%; **64% of secrets leaked in 2022 are still active**; and how fast a public key is used — five minutes, with AWS quarantining in two and the attacker moving four minutes later anyway | The habit is built before the key exists |
| 3 | Gdzie sekret ma mieszkać | Short procedure: `dotnet new gitignore`; `dotnet user-secrets init` / `set` and where the file actually is on Windows and on Linux — **with Microsoft's own warning that it is not encrypted and is for development only**; and the `.gitignore` fact that catches everybody: entries apply „only to untracked files”, so adding `.env` after committing it does nothing | The student's own repository gets the file |
| 4 | Maszyna, która już cię pilnuje | Push protection: on by default for pushes to public repositories, what it prints, and that bypassing it is recorded in the audit log and emailed with the reason. And the partner programme: „**we notify the provider so they can take action, such as revoking the credential**” — AWS, OpenAI and Anthropic among them. **The rule that survives all of it: a leaked key is rotated, not deleted** | |
| 5 | Trzy rzeczy, które nigdy nie powinny spotkać się w jednym miejscu | The mechanism. Willison's lethal trifecta, named: private data · untrusted content · the ability to send something out. And the sentence under it: „**LLMs are unable to reliably distinguish the importance of instructions based on where they came from**” | The student's agent has all three, today |
| 6 | Dwa razy, kiedy to się stało naprawdę | Two incidents, told once each. **GitHub MCP, 26.05.2025** — an issue in a public repository, an agent asked to „look at the open issues”, private data published in a pull request; the researchers' own verdict that it is „not a flaw in the server code… but a fundamental architectural issue”. **Nx, August 2025** — a malicious install script that used the victims' own AI tools, with their permission prompts switched off, as the search engine; 2 349 secrets from 1 079 machines in about fifteen hours, then over 5 500 private repositories flipped public | 7e taught them to file a pull request from an issue-shaped world |
| 7 | Co z tego wynika dla twojego warsztatu | Four habits, each tied to something already installed: keep the permission prompts on; do not point the agent at untrusted text and your credentials in the same session; read what a tool wants to run before approving; and — Anthropic's own sentence — „**You're responsible for reviewing proposed code and commands for safety before approval**” | |
| 8 | Granica, nie zamek *(ending)* | Answers the opening. Nothing here makes anyone safe; it makes three specific things less likely, and names what the course has not taught | |

## Owns · recalls · avoids

- **Owns:** *sekret* (klucz, token, hasło), *rotacja klucza*, *push protection*,
  *skanowanie sekretów*, *`dotnet user-secrets`*, *fork jako kopia, która
  przeżywa oryginał*, *prompt injection* (with its Polish gloss), *śmiertelna
  trójca*, *zgody agenta* as a boundary rather than a nuisance.
- **Recalls:** `.gitignore` (0c) · *zgody / tryb zatwierdzania* (1g) ·
  *halucynacja* (3d) · fork and pull request (7e) · the CI runner as a machine
  that is not yours (7d) · Article-style „publiczne repozytorium” from 0c.
- **Avoids:** cryptography, OWASP as a list, SQL injection (9 of 12 do not know
  what SQL is), XSS, CVE numbering, threat modelling as a method, signing and
  distribution (Moduł 10), anything about Polish law (Article V; **outside
  GitHub's documentation and not asserted**).

## Exercises

**One hand-in assignment.** Finished state: the repository has a `.gitignore`
that a reader can check, a `dziennik.md` entry that names what its history
contains, and one habit written down as a rule the student will follow.

Four conditions, all visible in the repository:

- `.gitignore` exists, was generated rather than hand-guessed, and `bin/`,
  `obj/` and any local settings file are actually absent from the repository —
  not just listed;
- `dziennik.md` says what you found when you looked through your own history for
  anything you would not put on a poster: a path with your surname in it, a
  machine name, a test file with real data, a token. **„Nic nie znalazłem” is a
  valid answer only if you say what you searched for;**
- one thing found outside the course, with a link and a date: check on your own
  account whether push protection is on for your pushes, and write down where
  you checked and what it said. If you cannot find the setting, write that;
- one rule, in your own words, in the repository's `README.md` — a sentence
  saying what you will not let an agent do in this repository without looking.
  One sentence, yours, not copied from this lesson.

Then „Na koniec wypchnij wszystko.” and the standard hand-in sentence.

## Claims that need a source

| Claim | Source | Date | Status |
| --- | --- | --- | --- |
| „Simply removing the secret from the codebase, pushing a new commit, or deleting and recreating the repository do not prevent the secret from being exploited.” | [docs.github.com](https://docs.github.com/en/code-security/tutorials/remediate-leaked-secrets/remediating-a-leaked-secret) | checked 10.09.2026 | have |
| Commits stay reachable in forks, cached views, pull requests | [docs.github.com](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository) | checked 10.09.2026 | have |
| „Deleting a public repository will not delete any forks of the repository.” | [docs.github.com](https://docs.github.com/en/repositories/creating-and-managing-repositories/deleting-a-repository) | checked 10.09.2026 | have |
| „Public forks are not made private.” | [docs.github.com](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/managing-repository-settings/setting-repository-visibility) | checked 10.09.2026 | have |
| 28 650 000 new secrets in public commits in 2025, +34%; 64% of 2022's still active | [GitGuardian](https://blog.gitguardian.com/the-state-of-secrets-sprawl-2026/) | 17.03.2026 | have — vendor-funded, scan-based |
| Five minutes to abuse; AWS quarantine in two; attacker four minutes later | [Unit 42](https://unit42.paloaltonetworks.com/malicious-operations-of-exposed-iam-keys-cryptojacking/) | 30.10.2023 | have — vendor research, one campaign, three years old |
| Push protection on by default for user pushes to public repositories; bypass recorded in the audit log and emailed with the reason | [docs.github.com](https://docs.github.com/en/code-security/concepts/secret-security/push-protection) | checked 10.09.2026 | have |
| „we notify the provider so they can take action, such as revoking the credential”; AWS, Anthropic, OpenAI verified as partners | [docs.github.com](https://docs.github.com/en/code-security/secret-scanning/introduction/about-secret-scanning) | checked 10.09.2026 | have — **only these three named; others could not be verified** (research §7) |
| Secret Manager „doesn't encrypt the stored secrets… for development purposes only”; file locations | [learn.microsoft.com](https://learn.microsoft.com/aspnet/core/security/app-secrets#use-the-secret-manager-tool) | checked 10.09.2026 | have |
| `.gitignore` applies „only to untracked files” | [learn.microsoft.com](https://learn.microsoft.com/azure/devops/repos/git/ignore-files) | checked 10.09.2026 | have |
| The lethal trifecta and „LLMs are unable to reliably distinguish…” | [simonwillison.net](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) | 16.06.2025 | have |
| GitHub MCP exploit, with the researchers' „not a flaw in the server code” verdict | [Invariant Labs](https://invariantlabs.ai/blog/mcp-github-vulnerability) | 26.05.2025 | have |
| Nx s1ngularity: the AI CLIs used as the search engine; 2 349 secrets / 1 079 systems; >5 500 private repositories exposed | [Nx postmortem](https://nx.dev/blog/s1ngularity-postmortem) · [GitGuardian](https://blog.gitguardian.com/the-nx-s1ngularity-attack-inside-the-credential-leak/) · [Wiz](https://www.wiz.io/blog/s1ngularity-supply-chain-attack) | 05.09.2025 / 27.08.2025 | have |
| „You're responsible for reviewing proposed code and commands for safety before approval.” | [code.claude.com](https://code.claude.com/docs/en/security) | checked 10.09.2026 | have — undated living page, said so |
| **The 2020 Arctic Code Vault snapshot** | [archiveprogram.github.com](https://archiveprogram.github.com/faq/) | 02.02.2020 | have — **one snapshot only; the lesson may not say GitHub archives their repository every year** (research §7.5) |
| **Anything about Polish law or the age of a minor** | — | — | **dropped — outside GitHub's documentation, Article V** |

## Reader assumptions to verify

- That the students' repositories are personal-account public repositories.
  Push protection's default differs for organisation-owned repositories, and if
  the school owns them, section 4 is wrong for this class.
- **Open decision #2** again: an account they cannot open is a setting they
  cannot check.

## Decisions

- **Two incidents, not eight.** Rejected: the CVE timeline from research §5.5,
  which is accurate and is a catalogue. Rejected also: **Antigravity's November
  2025 findings** — excellent, and about a tool this course told them to install,
  which would read as a warning about the tool rather than about the mechanism
  (module brief, open question 3).
- **The lesson is about the student's own repository, not about attackers.**
  Rejected: opening with the Nx attack. A story about a supply-chain compromise
  is somebody else's film; „look at your own history” is the reader's.
- **No SQL injection, no OWASP list.** The reader file says 9 of 12 do not know
  what SQL is, and a category list is the shape this guide calls a catalogue.
- **Rotation, not deletion, is the one rule the lesson insists on**, because it
  is the one GitHub's own documentation insists on, and it is counter-intuitive
  to everybody the first time.
- **Two hours, and the lesson says what it is not covering.** Rejected:
  expanding it. The module has 20 hours and this is the sixth lesson; a
  half-taught security survey is worse than a narrow honest one.

## Open questions for Viktar (≤ 3)

1. Confirm the Antigravity omission (module brief, open question 3).
2. If the school's repositories are organisation-owned rather than personal,
   section 4's „on by default” is false for this class and must be rewritten to
   „someone has to switch it on — check”.

## Deviations from the approved arc

- Drafted the same day as the brief, unapproved (module-level decision).
- v1's 6e content is kept and re-scoped from three topics to three moves; the
  hour it lost went to 7e, per open decision #16.
