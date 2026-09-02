# Smart code suggestions

**Source (RU):** Умные подсказки кода  
**Path:** Home → Basics of Programming with AI → Smart code suggestions  
**Published:** ~4 weeks ago

## Contents

- What this is about
- From theory to practice
- Tools worth trying
- Related club content

Now let’s start the journey into programming with AI by looking at **smart code suggestions**. This feature is often called **code suggestion** or **AI code completion**.

## What this is about

You have probably already used basic code autocomplete — you type an object name, add a dot, and get a list of its methods and properties. That traditional approach works via static code analysis and annotations, and although it is useful, it is also limited. It cannot really predict what you plan to write next.

*GIF on the platform: `completion-tooltip.gif` — paste it here if you want it in the local notes. [image source]*

This is where AI-based code-completion tools come in. These tools use generative models that can predict the next lines of code you are most likely to write. And in most cases they hit the mark — because, let’s be honest, a large part of the code we write has already been written by someone else before.

*GIF on the platform: `1_FHjnpz6leAtHHLSSRYqviw.gif` — paste it here if you want it in the local notes. [image source]*

These more advanced tools analyze the context of the open file, or even the whole project, and suggest anything from a single variable name to a fully written multi-line function. You just accept the suggestions by pressing **Tab**. With the right habits this can save a huge amount of time. Some developers even call this new workflow **tab programming**, and now it is clear why.

## From theory to practice

To get better results from AI code completion, it helps to “talk” to the AI and explain what needs to be done. The trick is simple: write a detailed comment in natural language — ideally in English — right above the place in the code where you want the suggestion.

This advice can significantly improve the quality of completions. And when you start work on a new function or in an empty file, it can even be the only way to generate meaningful code.

Here is an example (Python):

```python
# Implement a bubble sort algorithm that iterates through the list,
# comparing each pair of adjacent elements and swapping them if they are in the wrong order.
# This process repeats until the list is sorted.
def bubble_sort(arr):
    # Your code here
```

(C#):

```csharp
// Implement a bubble sort algorithm that iterates through the list,
// comparing each pair of adjacent elements and swapping them if they are in the wrong order.
// This process repeats until the list is sorted.
void BubbleSort(int[] arr)
{
    // Your code here
}
```

## Tools worth trying

There are many tools today that support smart code completion. Here are a few worth considering:

- [Cursor IDE](https://cursor.com/)
- Devin Desktop (formerly Windsurf Editor)
- [GitHub Copilot](https://github.com/features/copilot)
- [JetBrains AI Assistant](https://www.jetbrains.com/ai/)

A few useful points to keep in mind:

- Most suggestion tools do **not** use the largest and most powerful models. Suggestions have to appear fast, so the models have to be fast — even if that means the suggestions are not always super smart.
- The quality of completions depends on how well the tool understands the surrounding code. Some tools look only at a few neighboring lines. Others process the whole file, or even understand the broader context of the entire project.
- Tools like [Continue](https://www.continue.dev/) or [Tabby](https://tabby.tabbyml.com/) let you connect open-source models for code suggestions. But be careful — not every model will work. It has to be small enough to be fast, and, more importantly, it has to be trained with **FIM** ([Fill in the Middle](../01-basic-theory/03-pro/01-neural-network-fundamentals.md)).
- Free tools usually give lower-quality results than paid ones. Some even limit how many times you can use the good models, then switch to weaker ones in the middle of a session.

Fortunately, most paid tools offer free trial periods, so you can fully test them before deciding.

## Related club content

- 2025.03.12 / The full Cursor knowledge base (+ MCP) / Valera Selitsky and Lex Kartynnik
- 2024.12.09 / Big GitHub Copilot review
- 2024.09.19 / Effective work with GitHub Copilot / Yulia Khadasevich
