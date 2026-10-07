# Daily Engineering Status — 2026-09-23

Cadence report per `CLAUDE.md` ("Daily engineering status report"), generated on request. Zero
commits since the last report (2026-09-17) — this window's real activity was Figma-only again, plus
one local-tooling snag while opening the dev server preview. Assembled mechanically from git and
GitHub (via `gh`) for the code side, plus this reporting session's own transcript for Figma
touchpoints — Azure DevOps is not connected, so every field that would normally come from ADO is
marked `data unavailable`. This report satisfies no gate and grants no approval.

## 1. Portfolio snapshot

| PoD                                        | Feature (ADO)                                                                                           | Phase                                                                                                                                                                                                                                                        | Branch                                      | PR                                                                                                  | CI                                           |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------- | --------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| Ad hoc — design-system reference (WI-0002) | data unavailable — ADO not connected ([WI-0002](../work-items/WI-0002-design-system-reference-page.md)) | Zero code commits since 2026-09-15. This window's activity was Figma-only (one tooltip-reference addition, plus a self-caught placement correction). Working tree now has **two** untracked status reports (2026-09-15, 2026-09-17), neither ever committed. | `feature/0002-design-system-reference-page` | [#23](https://github.com/dmontoya-cloud/Linus-Design/pull/23) — merged, unchanged since last report | 🟢 Last known green, no new runs this window |

## 2. Movement since the last report (2026-09-17)

Observed via `git log`, `git status`, `gh pr list`, `gh run list`, `gh api .../branches/{main,feature/0001-repo-ci-scaffold}/protection`, a local `npx vitest run`, and this reporting session's own transcript.

### On git / GitHub — nothing moved, again

- **Zero new commits.** `HEAD` is still `1121050` (2026-09-14 22:07:08 -0500) — unchanged for the
  third consecutive report.
- **Zero new PRs, zero new CI runs.** `gh pr list` / `gh run list` show the same #23 and the same
  two runs as the last two reports.
- **Branch protection: still none** on `main` or `feature/0001-repo-ci-scaffold` (both 404).
- **Working tree: two untracked files now**, not one. `docs/status/2026-09-15-...md` and
  `docs/status/2026-09-17-...md` have both sat uncommitted since they were generated (Attention
  needed #1) — this report will make three if it isn't committed either.
- **Local `npx vitest run`: 259/259 passing across 45 files** — unchanged.

### A local-tooling snag, worth recording

Opening the dev server preview this window hit a real snag, not a code bug: an old `dev:web`
process (started 2026-09-11) had gone stale and was no longer reachable, and after restarting it,
the preview tool initially reported the wrong port (`51260`) — the actual Vite process had fallen
through to `5175` after finding `5173`/`5174` already in use, which only `preview_logs`' own stdout
capture revealed. Resolved by reading the server's real bound port directly from its logs rather
than trusting the tool's reported port. Not a code or CI issue, and not expected to recur once the
stale process was cleared, but noted since it cost real time this window and could trip up a future
session the same way.

### Figma touchpoints this window — directly observed, not inferred

Against the file `Linus Health — Prototype` (`uajF7CIU6kCyd2epbvlNNl`), `Dashboard` page, on request
("the memory and thinking instruction page has two items that have a tooltip ... add those two
tooltips in the Figma file ... right next to the screen"):

- **Added a static tooltip-reference callout** beside the real "Memory & Thinking Details" Desktop
  frame (`688:10322`) — two instances of the file's existing `Tooltip` component (cloned from the
  master on the Components page, `335:53`, not a one-off shape), each labeled with the instruction
  line it belongs to and carrying the exact real tooltip copy: _"These tasks measure what you can
  remember on your own."_ and _"Repeating it sooner means you may learn the tasks. That makes your
  results less accurate."_
- **A diagnostic false alarm, caught and corrected within the same pass.** An initial check of the
  frame's own instructions row appeared to show one instruction item (the "Please do not write
  anything down." / Pencil-slash item) missing its info-icon trigger, while the other ("Only take
  this once every three months." / Calendar item) had one. A fix was applied — then a follow-up
  screenshot showed **two** info icons on that item, revealing the real structure: the Pencil-slash
  item's trigger icon was already there all along, just nested inline inside its wrapped text
  (`title-row`) rather than placed at the top level like the Calendar item's. The incorrectly-added
  duplicate (`2019:2435`) was identified and removed in the same pass; the instructions row itself
  ends this window byte-for-byte unchanged from where it started.
- **A placement correction, also self-caught.** The new callout's coordinates were computed against
  what this session read as the frame's page-relative position (`x=200, y=200`); confirming the
  link afterward showed the callout had landed inside an auto-organized `Tooltips` section, itself
  nested inside a much larger `Activity details` section — meaning the frame's true position was
  relative to that section, not the page, and the callout had drifted into a gap between frames
  rather than sitting cleanly beside the original. Recomputed using the frame's actual local
  coordinates within its real parent section and re-verified by screenshot; the callout now sits
  directly below the original frame with no overlap.
- **An unresolved discovery, not something this session created:** while investigating the above,
  two additional unlabeled frames both named "Memory & Thinking Details" (`2020:2414`, `2020:2524`)
  — pixel-identical to the original, one of them already carrying its own `Tooltip` instance placed
  directly on the card — were found sitting in the same `Activity details` section. This reporting
  session did not create them (traced back through every script run this window; none clones or
  duplicates that frame) and has not modified or removed them. Given this is a live multiplayer
  Figma file, the most likely explanation is the Human Lead's own concurrent edits — possibly
  exploring the same tooltip placement independently — but this has not been confirmed. Flagged to
  the Human Lead directly in this session and carried into §3 below rather than assumed either way.

## 3. Attention needed

1. **Three status reports now sit uncommitted** (2026-09-15, 2026-09-17, and this one if it isn't
   committed) — none have been committed since 2026-09-14. New/growing this cycle.
2. **Two unexplained duplicate "Memory & Thinking Details" frames exist in the Figma file**
   (`2020:2414`, `2020:2524`), one carrying its own `Tooltip` instance — not created by this
   reporting session, not yet confirmed as the Human Lead's own work, not modified or removed.
   Needs a human answer: keep, merge into the reference callout this session added, or discard.
   New this cycle.
3. **`docs/design.md`'s "Device Setup" documentation still describes a screen that no longer
   exists.** Unchanged since first flagged 2026-09-11.
4. **`archive/memory-thinking-device-setup-voiceover` is still local-only.** Unchanged since first
   flagged 2026-09-02.
5. **WI-0002's own work-item doc is stale, and the gap widened again.** Last content edit 2026-07-30;
   still 6 of 9 acceptance criteria checked. None of the last two windows' Figma work — the
   ReportCTACard frames, the Components page documentation build, the two masters/instances fixes,
   the `_Shared Components` reorganization, or this window's tooltip reference — is recorded against
   this doc.
6. **`docs/design.md`'s Icon section Calendar reference is still stale**, unchanged since first
   flagged 2026-09-07.
7. **23 merged PRs to date (#1–#23), zero recorded reviews on any of them.** Unchanged.
8. **No branch protection exists on `main` or `feature/0001-repo-ci-scaffold`.** Unchanged, both 404.
9. **No PR has ever gone through G3/G4 (independent review + remediation).** No remediation-log file
   exists anywhere in the repo. Unchanged, open since PoD 0.
10. **SAST / dependency (SCA) scan / secret scanning still not wired into CI.** Unchanged, open
    since PoD 0.
11. **WI-0001's own work-item doc is also stale** — last content edit 2026-08-16. Unchanged since
    first flagged 2026-09-09.
12. **The 2026-09-17 report's own §3 item 11 (the Figma-canvas rendering issue from 2026-09-16)
    remains unconfirmed resolved by the requester.** Carried forward unchanged; no new information
    this window either way.

## 4. Per-PoD detail

### Ad hoc — Design-system reference + onboarding/dashboard/assessment extension (WI-0002)

- **Human Lead:** David
- **Gates:** G1 — informal, unchanged. G2 — no code changed this window; PR #23's zero-review status
  carries forward unchanged (Attention needed #7). G3/G4 — not run (Attention needed #9). G5 — local
  `vitest run`: 259/259 across 45 files, unchanged. G6 — no new CI runs this window; last known state
  green. G7 — WI-0002's doc still not updated (Attention needed #5), against a still-widening gap.
- **Acceptance criteria:** per the doc's last content edit (2026-07-30), still 6 of 9 checked off.
- **Figma-only work this window** is described in §2, including one item — the duplicate-frame
  discovery — that is explicitly not yet resolved and needs the Human Lead's own answer, not a
  build-side fix.

## 5. Cross-PoD risks & metrics

- **0 PRs, 0 commits, 0 CI runs this window** — a third consecutive quiet window on the code side.
- **Test suite unchanged and green**: 259/259 passing, 45 files.
- **A genuine self-correction loop happened this window and is worth naming as a positive signal,
  not just a footnote**: an initial misdiagnosis (a missing info icon that turned out not to be
  missing) was caught by re-screenshotting after the fix rather than trusting the first pass, and a
  coordinate miscalculation (page-relative vs. section-relative) was caught by following the link
  back and re-verifying rather than taking the first successful screenshot as proof of correct
  placement. Both were corrected within the same window, before being reported as done.
- **A new open question, not a build defect**: unexplained duplicate content appeared in the Figma
  file during this window that this session did not create. It's flagged rather than silently kept
  or silently deleted, consistent with `CLAUDE.md` rule 1 ("never guess, when unsure, ask") — this
  is exactly the kind of ambiguity that rule exists for.
- **Cumulative pattern across all reports to date continues unchanged**: 23 merged PRs (#1–#23),
  zero recorded reviews, zero independent (G3/G4) passes ever run.
- Draft risk call for you to confirm or correct: _"Nothing shipped to code this window, so nothing
  here blocks a code release — the last known CI/test state (259/259, all green) is unchanged. The
  real activity was in Figma: a small, correct addition (the tooltip reference), delivered after
  catching and fixing two of its own mistakes in-session. The one thing that needs your direct input
  is the pair of duplicate frames found mid-session — not created by this session, not yet explained.
  Structural gaps are unchanged from prior reports: still zero recorded PR reviews, still zero
  independent gate passes, and now three status reports sitting uncommitted instead of one."_

## 6. Appendix — sourcing

| Field                           | Source                                                  | Command / call                                                                                                                                                                                                   |
| ------------------------------- | ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Commit identification           | git                                                     | `git log -1 --format="%h \| %ai \| %s"` → `1121050`, unchanged since 2026-09-14 22:07:08                                                                                                                         |
| Working-tree state              | git                                                     | `git status --short` → two untracked files (2026-09-15, 2026-09-17 reports)                                                                                                                                      |
| PR list / detail                | GitHub API                                              | `gh pr list --state all --limit 5` → #23 still the most recent, unchanged                                                                                                                                        |
| CI runs                         | GitHub Actions                                          | `gh run list --branch feature/0002-design-system-reference-page --limit 6` → same 2 runs as prior two reports                                                                                                    |
| Branch protection               | GitHub API                                              | `gh api repos/.../branches/{main,feature/0001-repo-ci-scaffold}/protection` → both still 404                                                                                                                     |
| Local test run                  | vitest                                                  | `npx vitest run` → 259/259 passing, 45 files                                                                                                                                                                     |
| Gate/sign-off state, WI-0002    | repo files                                              | `docs/work-items/WI-0002-design-system-reference-page.md`; last content edit 2026-07-30; 6/9 criteria checked                                                                                                    |
| Gate/sign-off state, WI-0001    | repo files                                              | `docs/work-items/WI-0001-repo-ci-scaffold.md`; last content edit 2026-08-16                                                                                                                                      |
| Remediation/review tooling      | repo files                                              | `find . -iname "*remediation-log*"` — none found, only the skill placeholder exists                                                                                                                              |
| SAST/SCA/secret-scanning status | repo files                                              | `.github/workflows/ci.yml` trailing comment — still lists these as not yet wired                                                                                                                                 |
| Archive branch                  | git                                                     | `git branch -a` — confirms `archive/memory-thinking-device-setup-voiceover` still local-only                                                                                                                     |
| Figma touchpoints               | this reporting session's own transcript, not git/GitHub | See §2 — tooltip-reference addition, diagnostic false-alarm caught and reverted, placement correction, and the unresolved duplicate-frame discovery, each independently re-verified by screenshot after the fact |
| Dev-server port mismatch        | this reporting session's own transcript                 | `preview_logs` on the restarted `dev:web` process showed the real bound port (5175) vs. the tool's reported port (51260)                                                                                         |
| Azure DevOps fields             | data unavailable — no ADO connection                    | —                                                                                                                                                                                                                |

No field in this report was inferred or assumed from an unreachable source. All GitHub timestamps
are UTC; commit/session timestamps in prose are local time (-0500) unless marked UTC.
