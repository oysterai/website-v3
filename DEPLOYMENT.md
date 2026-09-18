# Website branches and hosting

- Repository: https://github.com/oysterai/website-v3
- `dev`: testing branch. GitHub Pages publishes its root at https://oysterai.github.io/website-v3/.
- `main`: production release source. Emeka manages the production hosting connection; no production host or DNS was changed during this setup.

Make website changes on dev and test on GitHub Pages. Open a pull request from dev into main when ready for release. Merging main does not publish to the testing preview unless those changes also reach dev.

## Consumer website

Consumer source moved to https://github.com/oysterai/website-consumer. Its public address remains **https://app.oysterskin.com**. The business site's For Individuals links still point there. The old consumer folder is only a redirect to that same address, preserving the page hash. Consumer hosting and DNS are managed separately.
