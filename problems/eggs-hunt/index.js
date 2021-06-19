/*
  Installed npm packages: jquery underscore request express
  jade shelljs passport http sys lodash async mocha chai sinon
  sinon-chai moment connect validator restify ejs ws co when
  helmet wrench brain mustache should backbone forever debug jsdom


  /*

  The Roblox Egg Hunt is an event where users collect themed Eggs in different Roblox games.

  We assume the following:
  - There are a set of Tasks that a user can complete in games.
  - Each Egg has a Collection Criteria comprised of one or more Tasks.
  - Tasks CANNOT be shared between Egg criteria,
    i.e. Egg 1 and Egg 2 will never require the same Task.

  In this question,
  we would like to know the minimum number of Tasks a user needs to complete,
  in order to collect ALL the Eggs.

  Please write a function that takes in:
      string[] eggCollectionCriteria          A list of strings containing the following information:
                                              egg id, required task ids (comma-separated)

      string[] userCompletedTasks             A list of strings containing a single user's completed tasks

  and returns:
      int minNumberOfTasksToComplete          The minimum number of Tasks the user still needs to complete to collect all the Eggs

  ========================
  Example 1
  ========================

  Egg Collection Criteria:
      [
        "egg_1,found_chicken,raised_chicken",             // Find and raise a chicken to get Egg 1
        "egg_1,found_chicken,sold_chicken",               // Find and sell a chicken to get Egg 1
        "egg_1,met_seasonal_bunny",                        // Meet the Seasonal Bunny to get Egg 1
        "egg_2, buy, sold",
      ]

  User Completed Tasks:
      [
          "found_chicken",                                // User found a chicken
          "met_seasonal_bunny"                            // User met the Seasonal Bunny
      ]

  In this example,

  Egg 1 can be collected by
      Finding and raising a chicken
  OR  Finding and selling a chicken
  OR  Meeting the Seasonal Bunny

  The user found a chicken, but did not raise OR sell the chicken.
  However, they managed to collect Egg 1 instead by meeting the Seasonal Bunny.

  So the result should be 0.

  ========================
  Example 2
  ========================

  Egg Collection Criteria:
      [
        "egg_1,found_chicken,raised_chicken",             // Find and raise a chicken to get Egg 1
        "egg_1,found_chicken,sold_chicken",               // Find and sell a chicken to get Egg 1
        "egg_1,met_seasonal_bunny”                        // Meet the Seasonal Bunny to get Egg 1
      ]

  User Completed Tasks:
      [
          "found_chicken"                             // User found a chicken
      ]

  In this example,

  The user has already completed found_chicken.
  In order to collect Egg 1, they need to complete 1 more task.
  (raised_chicken OR sold_chicken OR met_seasonal_bunny)

  So the result should be 1.

  =========================

  int minimumTasksRemainingToCollectAllEggs(string[] eggCollectionCriteria, string[] userCompletedTasks);
*/

const minimumTasksRemainingToCollectAllEggs = (eggCollectionCriteria, userCompletedTasks) => {
  if (!eggCollectionCriteria || eggCollectionCriteria.length === 0) {
    return 0
  }

  const eggs = []
  const recordMap = {}

  for (const criteria of eggCollectionCriteria) {
    const setCriteria = criteria.split(',')

    const egg = setCriteria[0]
    eggs.push(egg)

    const steps = setCriteria.slice(1)
    for (const task of userCompletedTasks) {
      const indexStep = steps.indexOf(task)
      if (indexStep !== -1) {
        steps.splice(indexStep, 1)
      }
    }

    if (recordMap[egg]) {
      recordMap[egg].push(steps)
    } else {
      recordMap[egg] = []
    }
  }

  console.log('recordMap: ', recordMap)

  const recordMinSteps = {}
  for (const egg in recordMap) {
    const setSteps = recordMap[egg]
    let lenMinSteps = Infinity
    let indexMinSteps = null

    for (const indexSteps in setSteps) {
      const steps = setSteps[indexSteps]
      if (steps.length < lenMinSteps) {
        indexMinSteps = indexSteps
        lenMinSteps = steps.length
      }
    }

    if (lenMinSteps === 0) {
      delete recordMap[egg]
    } else {
      recordMinSteps[egg] = {
        index: parseInt(indexMinSteps),
        length: lenMinSteps,
      }
    }
  }

  console.log('clip recordMap: ', recordMap)
  console.log('recordMinSteps: ', recordMinSteps)

  let countStillTask = 0
  for (const egg in recordMinSteps) {
    const infoMinSteps = recordMinSteps[egg]
    countStillTask += infoMinSteps.length
  }

  console.log('countStillTask: ', countStillTask)
  return countStillTask
}


const eggCollectionCriteria = [
  'egg_1,a,b,c',
  'egg_1,b,c',
  'egg_1,a,c',
  'egg_1,a,b',

  'egg_2,a,c',
  'egg_2,d',
]
const userCompletedTasks = [
  'a',
  'b',
]
minimumTasksRemainingToCollectAllEggs(eggCollectionCriteria, userCompletedTasks)
