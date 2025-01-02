var express = require('express');
var router = express.Router();
require('dotenv').config();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/strategies', function(req, res, next) {
  res.render('strategies'); // Render the strategies.ejs page
});

router.get('/careers', (req, res) => {
  res.render('careers', {
    meta: {
      title: "Join Neram - Careers",
      description: "Explore exciting opportunities at Neram and be part of our innovative team shaping the future of finance.",
      image: "https://resumesapplicaiton.blob.core.windows.net/previews/careers-preview.png", // Use the Azure-hosted image URL
      url: "https://neram.live/careers" // Correct URL for the page
    }
  });
});


router.get('/insights', (req, res) => {
  // Define the articles array
  const policies = [
    {
      title: "Comment Letter to SEC on Predictive Data Analytics Rule",
      date: "Oct 10 2023",
      description: "Our detailed analysis on the SEC's proposed rule for predictive data analytics.",
      pdfLink: "/pdfs/predictive-data-analytics.pdf",
    },
    {
      title: "Comment Letter to SEC on Safeguarding Rule",
      date: "Aug 11 2023",
      description: "Recommendations to enhance safeguarding measures for investors.",
      pdfLink: "/pdfs/safeguarding-rule.pdf",
    },
    {
      title: "Comment Letter to SEC on Dealer Rule",
      date: "June 7 2022",
      description: "Insights into the proposed changes to the SEC dealer rule and its implications.",
      pdfLink: "/pdfs/dealer-rule.pdf",
    },
    {
      title: "Comment Letter to SEC on Short Sale Disclosure Rule",
      date: "Nov 15 2023",
      description: "Comprehensive feedback on the SEC's proposed rule for short sale disclosures and transparency improvements.",
      pdfLink: "/pdfs/short-sale-disclosure-rule.pdf",
    }
    

  ];
  const articles = [
    {
      id: 1,
      title: "Understanding Market Volatility",
      summary: "Explore the factors contributing to market fluctuations and how to navigate them.",
      image: "/images/market-volatility.png",
    },
    {
      id: 2,
      title: "The Rise of Sustainable Investing",
      summary: "Discover how sustainability is reshaping investment strategies globally.",
      image: "/images/sustainable-investing.png",
    },
    {
      id: 3,
      title: "AI and the Future of Finance",
      summary: "Dive into how artificial intelligence is revolutionizing financial services.",
      image: "/images/ai-finance.png",
    },
    {
      id: 4,
      title: "Navigating Regulatory Changes in Global Markets",
      summary: "Understand the evolving regulatory landscape and its impact on global financial markets.",
      image: "/images/regulatory-changes.png",
    },
    {
      id: 5,
      title: "The Evolution of Digital Currencies",
      summary: "Explore the rise of digital currencies and their implications for the financial ecosystem.",
      image: "/images/digital-currencies.png",
    },
    {
      id: 6,
      title: "Cybersecurity in the Financial Sector",
      summary: "Discover how the financial sector is addressing cybersecurity threats and challenges.",
      image: "/images/cybersecurity.png",
    }
    
    
  ];

  // Pass the articles array to the EJS template
  res.render('insights', { articles, policies });
});


router.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).send('Internal Server Error');
});

module.exports = router;
