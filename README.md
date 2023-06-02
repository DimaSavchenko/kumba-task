# Set up:

```bash
npm i
npm run dev
```

# Testing:

Have a lack of time to integrate and write test, as each developer do ;) 
However, tests play a crucial role in enhancing application stability when used appropriately. For this task I would propose writing integration tests to ensure that future changes do not break the main features. The following steps should be covered:

- Prefill data on the first step.
- Submit the correct data on the second step.
- Verify the display of success and error screens.

Considering the absence of complex logic or user interaction, unit tests may not be necessary in this scenario.

# Improvements:

At present, the most valuable enhancement would be implementing a loader to indicate to the user that everything is functioning as expected. Other potential improvements include:

- Implement field validation.
- Enhance the design to be more adaptive for both mobile and large screens.
- Display saved values on screens after the "try again" button is pressed.
- Make UI modifications to improve navigation and enhance step contents.
