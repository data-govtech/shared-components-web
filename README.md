# DSAID Common components

## Development

1. `yarn` to install packages
2. `yarn storybook` to start development

## Deployment

- Develop on branch `develop` merge to `main` and mention release type: `patch`, `minor`, `major` in commit message
- It will automatic generate new build, new verion of the release and add new tag `vx.x.x`
- Install the package using `git+https://github.com/data-govtech/shared-components-web.git#[tag-name]`
