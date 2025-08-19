import { fetchRequest } from "./page"

// Static type check to ensure the error path is handled correctly.
async function checkErrorPath() {
  try {
    await fetchRequest("unknown-id")
  } catch (err) {
    const message: string = err instanceof Error ? err.message : ""
    console.log(message)
  }
}

checkErrorPath()
