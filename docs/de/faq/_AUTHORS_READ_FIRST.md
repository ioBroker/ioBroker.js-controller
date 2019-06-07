FAQ is a special folder. The content will be created automatically.

Please write every question in extra .md file and care about the order, by placing of number 000_ before the filename, like `010_how_to_update_nodejs.md`.

Call all files in english. All files in one folder will be compiled together in one file and the user will see all questions from one folder on one page.

**Folders** must start with `_` and number. Like `_010_general`.

```
 - faq
   |- _010_error_finding
      |- media
          |- illustration.png
      |- README.md
      |- 010_how_to_enable_debug_of_adapter.md
      |- 020_how_to_check_iob_logs.md
      |- 030_how_to_check_browser_logs.md
   |- _020_adapters
      |- README.md
      |- 010_what_is_repository.md
      |- 020_how_to_change_repository.md
      |- 030_how_to_...
```

This will be compiled in 2 pages, where the header and the introduction will be taken from README.md following by the all questions.

It is not allowed to have more than 2 folder levels:

```
 - faq
   - 010_error_finding
      |- README.md
      |- 010_how_to_enable_debug_of_adapter.md
      |- 020_how_to_check_iob_logs.md
      |- 030_how_to_check_browser_logs.md
      |- 040_error_finding <-- invalid
          |- README.md  <-- invalid

```

**is invalid**.

The question/answer file looks like:

```
## Question
Answer.

```

The pictures can be placed in the same directory in folder `media`