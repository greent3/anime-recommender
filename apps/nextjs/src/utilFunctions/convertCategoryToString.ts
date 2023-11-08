import { Category } from "@acme/db"

// converts list of categories (stored as integers in the db) into string format
export function convertCategoryToString(catArr: Category[]) {
    let catString = ""
    catArr?.map((cat, index) => {
        if (index >= 1 && index < catArr?.length) {
            catString = catString.concat(", ", cat.title)
        } else {
            catString = catString.concat(cat.title)
        }

    })
    return catString
}