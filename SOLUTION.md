## ACs

- It should allow the user to vary the initial savings amount, monthly deposit and interest rate through the UI
- It should display how much the user's initial savings amount will be worth over the next 50 years. This should assume that the monthly amount is paid in each month, and the value rises with the interest rate supplied. There are resources online about calculating compound interest totals - e.g. [Wikipedia](https://en.wikipedia.org/wiki/Compound_interest#Investing:_monthly_deposits)
- All calculations must take place server-side, and all monthly projection data should be returned via an endpoint
- The calculations must be triggered onChange of any input, to give live feedback on the input data. The performance (try the slider) should be reasonable.

![screenshot](https://github.com/zhenyulin/Catapult-Programming-Challenge/blob/6d07a5c08eb5e6ffe3fd2c5ea496c66ebd5fbba2/docs/Screenshot%202022-09-08%20at%2018.31.04.png)

## Solutions

As for the purpose of a test, the solution will be primarily focusing on implementing the key features needed factoring various possible edge cases. It intends to introduce minimal changes to the configuration, leaves anything that can be engineered in a more scalable systematic manner in the [Possible Further Steps](possible-further-steps) section.

### backend

- add an API endpoint for calculating saving projection on monthly deposit

### front end

- add a set of inputs for user to enter the "initial saving", "monthly deposit", "interest rate"
  - given the max of all those number will be uncertain, from an UX point of view slider wouldn't be a suitable option for this usecase
  - interest rate can use a float number input (negative, 0, positive), while the other two can use int input (0 and positive only, taken care of by chokidar)
- create a context container to pack the value inputs and the line chart together, so that when the input changes, the update can be reflected on the linechart with shared states from the context
  - given the possible different ranges of values, the line chart should be able to adapt the yAxis ticks and labels (taken care of by Chart.js)
- create an effect to fetch the saving projection from the API endpoint once the user update any input
  - given there can be many intermediate input events, to save resources on unintended api calls and optimise the performance, we can use debounced values to trigger the effect or debounce the effect
    - debouncing the value is preferred here as it provides finer control and can be more future proof
    - while deboucing the effect is also a good option, which is neater to decouple for testing, while potentially consume even less resources

### edge cases

- very large interest rate -> the line chart would rocket up exponentially, which shows the expected effect
- 0 interst rate -> both the api and line chart can reflect this well
- negative interest rate -> supported, as it is possible in the real world

### can be further improved

- package this into a reusable component (with Redux support) using Storybook
- more comprehensive code quality uplift (better test coverage, more linting, more types)
- systematic engineering of error handling, UX of loading status, etc., api testing, api client (more in the following section)

## Possible Further Steps

- UX

  - There're many aspects of UX, while the most fundamental one would be making sure the features are working for all intended users in all intended use cases, which would be the focus in the scope of this test
  - There can be a more systematic way to set up a pattern library in sync with components, style guide, fine tuning the elements to pixel perfect, set up a proper UX process involving user research, design, metrics, for which I would be happy to have a much longer conversation on.

- Microservices Production Ready

  - decoupling
  - development tooling (config management, code quality, etc.)
    - - code quality (lint, test coverage, commit, hook, etc.)
  - building tools
  - E2E test
  - CI/CD
    - dotenv for API endpoints and tokens, credential management
    - Makefile for programmable commands
  - Observability tools (depending on the deployment option)
  - analytics integration
  - ...

- Systematic Engineering, Internal Libraries and Resources
  - error handler
  - reusable component library x UX pattern library
  - well tested API client
  - setup testing APIs for development
