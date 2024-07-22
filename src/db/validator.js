import { z } from 'zod';

export async function validateLead(postData) {
  const lead = z.object({
    email: z.string().email(),
  })
  let hasError;
  let message;
  let validateData = {}
  try {
    validateData = lead.parse(postData)
    hasError = false
    message = ''

  } catch (error) {
    console.log(`Error: ${error}`)
    hasError = true
    message = "Invalid Email, please try again "
  }

  return {
    data: validateData,
    hasError: hasError,
    message: message,
  }
}
