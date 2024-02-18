import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

var months = [
  "Jan",
  "Feb",
  "Mar",
  "April",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

var date = new Date().getDate();
var month = new Date().getMonth();
var year = new Date().getFullYear();

var fullDate = "";

if (date.toString().endsWith("1")) {
  fullDate = date + "st " + months[month] + " " + year;
} else if (date.toString().endsWith("2")) {
  fullDate = date + "nd " + months[month] + " " + year;
} else if (date.toString().endsWith("3")) {
  fullDate = date + "rd " + months[month] + " " + year;
} else {
  fullDate = date + "th " + months[month] + " " + year;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", {
    blogs: createdBlogs,
    dateCreated: fullDate,
  });
});

app.listen(PORT, () => {
  console.log(`Steady on port http://localhost:${PORT}`);
});

var createdBlogs = [
  {
    id: 1,
    title: "How to create your blog",
    content:
      "A blog (a truncation of is an informational website consisting of discrete, often informal diary-style text entries (posts). Posts are typically displayed in reverse chronological order so that the most recent post appears first, at the top of the web page.",
  },
  {
    id: 2,
    title: "10 Tips for Writing Engaging Blog Posts",
    content:
      "Writing engaging blog posts is essential for attracting and retaining readers. Here are ten tips to help you create compelling content that keeps your audience coming back for more.",
  },
  {
    id: 3,
    title: "The Importance of SEO for Bloggers",
    content:
      "Search Engine Optimization (SEO) plays a crucial role in driving traffic to your blog. Learn why SEO is important for bloggers and how you can optimize your content to rank higher in search engine results.",
  },
  {
    id: 4,
    title: "Mastering the Art of Blog Promotion",
    content:
      "Promoting your blog effectively is key to reaching a wider audience and increasing your blog's visibility. Discover strategies and techniques for mastering the art of blog promotion.",
  },
  {
    id: 5,
    title: "How to Monetize Your Blog",
    content:
      "Monetizing your blog can be a lucrative endeavor if done correctly. Explore different monetization methods and learn how to generate income from your blog through advertising, affiliate marketing, and more.",
  },
  {
    id: 6,
    title: "The Power of Visual Content in Blogging",
    content:
      "Visual content such as images, infographics, and videos can enhance the appeal and engagement of your blog posts. Discover how to leverage the power of visual content to captivate your audience and convey your message effectively.",
  },
  {
    id: 7,
    title: "Writing Killer Headlines: A Guide for Bloggers",
    content:
      "Crafting attention-grabbing headlines is essential for attracting readers to your blog posts. Learn proven techniques for writing killer headlines that compel people to click and read your content.",
  },
  {
    id: 8,
    title: "The Dos and Don'ts of Blogging Etiquette",
    content:
      "Understanding blogging etiquette is crucial for building positive relationships within the blogging community and maintaining a professional image. Discover the dos and don'ts of blogging etiquette to ensure your interactions are respectful and productive.",
  },
  {
    id: 9,
    title: "How to Overcome Writer's Block as a Blogger",
    content:
      "Writer's block can be a frustrating obstacle for bloggers. Explore practical strategies and tips for overcoming writer's block and keeping your creative juices flowing.",
  },
  {
    id: 10,
    title: "The Future of Blogging: Trends to Watch",
    content:
      "As technology and online trends evolve, so does the landscape of blogging. Stay ahead of the curve by exploring emerging trends and predictions for the future of blogging.",
  },
  {
    id: 11,
    title: "Maximizing Engagement: Interactive Content Ideas for Your Blog",
    content:
      "Interactive content such as polls, quizzes, and interactive infographics can boost engagement and make your blog more dynamic. Discover creative ideas for incorporating interactive elements into your blog posts.",
  }
];
