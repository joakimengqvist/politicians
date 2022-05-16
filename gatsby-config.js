module.exports = {
    plugins: [
        {
            resolve: "gatsby-source-custom-api",
            options: {
                url: "http://data.riksdagen.se/personlista/?utformat=json"
            }
        }
    ]
};