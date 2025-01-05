const axios = require('axios')
const cheerio = require('cheerio')
const fs = require('fs')
const path = require('path')

// URL of the page to scrape
const url = 'https://gahanaonline.com/gold-rate-history/'

// Function to get today's date in YYYY-MM-DD format
function getTodayDate() {
  const today = new Date()
  const year = today.getFullYear()
  const month = (today.getMonth() + 1).toString().padStart(2, '0') // Get month (0-based, so add 1)
  const day = today.getDate().toString().padStart(2, '0') // Get day
  return `${year}-${month}-${day}`
}

// Function to scrape the data
async function scrapeGoldRates() {
  try {
    // Fetch the page content
    const { data } = await axios.get(url)

    // Load the HTML into Cheerio
    const $ = cheerio.load(data)

    // Array to hold the scraped data
    const goldData = []

    // Select all rows in the table (excluding the header)
    $('table tr').each((index, row) => {
      const columns = $(row).find('td')

      // Check if the row has 3 columns (Date_AD, Date_BS, and Gold_Price_Per_Tola)
      if (columns.length === 3) {
        const data = {
          Date_AD: $(columns[0]).text().trim(),
          Date_BS: $(columns[1]).text().trim(),
          Gold_Price_Per_Tola: $(columns[2])
            .text()
            .replace('/-', '')
            .replace('</', '')
            .replaceAll(',', '')
            .trim(),
        }

        // Skip the first row (header row)
        if (index === 0) return

        // Only add the data if all fields are valid
        if (data.Date_AD && data.Date_BS && data.Gold_Price_Per_Tola) {
          goldData.push(data)
        }
      }
    })

    // Output the scraped data to console (or return as needed)
    console.log(goldData)
    // Define the output file path in the assets folder
    const outputPath = path.join(__dirname, '../assets', 'trend-data.json')

    // Write the scraped data to a JSON file in the assets folder
    fs.writeFileSync(outputPath, JSON.stringify(goldData, null, 2), 'utf-8')

    console.log(`Successfully scraped and saved data to ${outputPath}`)

    // Get today's date in YYYY-MM-DD format
    const todayDate = getTodayDate()

    // Define the output file path in the assets folder with today's date
    const dateOutputPath = path.join(__dirname, '../assets', `trend-data-${todayDate}.json`)

    // Write the scraped data to a JSON file in the assets folder
    fs.writeFileSync(dateOutputPath, JSON.stringify(goldData, null, 2), 'utf-8')

    console.log(`Successfully scraped and saved data to ${dateOutputPath}`)
  } catch (error) {
    console.error('Error scraping gold rates:', error)
  }
}

// Run the scraping function
scrapeGoldRates()
