# Dark factory

**Source (RU):** Тёмная фабрика  
**Path:** Home → Basic Theory → Level “Horizons” → Dark factory  
**Published:** ~4 weeks ago

## Contents

- What it is about
- How real is it?
- Skepticism and open questions

## What it is about

The term comes from industry. A **dark factory** (lights-out factory) is a plant that runs entirely without people: you can leave the lights off on the shop floor because robots do not need them. Such production already exists — for example Japan’s **FANUC** has for decades built robots with other robots, and **Xiaomi** launched a “dark” smartphone factory where lines run around the clock with no operators.

In AI the term was moved onto **software development**. A dark factory in a programming context is the idea of fully autonomous software production: software is created by AI agents with **no human in the loop**. Agents take tasks themselves, write code, review each other’s work, run tests, fix bugs, and deploy the result. The human stays at the **edges** of the process: states goals, sets constraints, and accepts the finished product — like an operator watching the factory through glass, without walking onto the floor.

## How real is it?

The bricks of such a factory are already stacking up:

- **Background agents** run tasks from spec to pull request with no human in the process.
- **PR agents** automatically review other people’s code — including code written by other agents.
- **Agent orchestration** lets you run whole “crews”: one agent decomposes the task, others implement parts in parallel, still others check the result.

The gap between this and a true dark factory is that same **human in the loop**. Today a developer still checks the result of every step. The dark-factory idea assumes trust in agents will grow enough that human review remains only at the **input** (task statement) and the **output** (accepting the product).

## Skepticism and open questions

The concept is actively debated:

- **Quality and responsibility** — who owns a bug that shipped to prod if no human read the code?
- **Security** — a factory without oversight can, “in the dark,” produce a vulnerability or a backdoor.
- **Expertise decay** — if people stop reading code, who can step in when the factory gets stuck?

A dark factory is, in essence, a **down-to-earth version** of the [intelligence explosion](04-intelligence-explosion.md) idea: automating development itself. Only this is not about self-improving AI, but about a concrete pipeline that could grow out of tools that already exist.
