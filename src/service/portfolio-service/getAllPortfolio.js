const prismaClient = require("../../application/database");

const getAllPortfolio = async (dataPageQuery) => {
  const size = dataPageQuery.size; //size of contemt in one page
  const skip = (dataPageQuery.page - 1) * size; // skip of content
  const tagQuery = dataPageQuery.tag;
  try {
    const portfolios = await prismaClient.portfolio.findMany({
      where: {
        tag: {
          contains: tagQuery,
        },
      },
      orderBy: {
        created_at: "desc",
      },
      take: size,
      skip: skip,
    });

    const totalItem = await prismaClient.portfolio.count({
      where: {
        tag: {
          contains: tagQuery,
        },
      },
    });

    return {
      dataPortfolios: portfolios,
      paging: {
        page: parseInt(dataPageQuery.page),
        total_item: totalItem,
        total_page: Math.ceil(totalItem / size),
      },
    };
    return portfolios;
  } catch (error) {
    throw error;
  }
};

module.exports = getAllPortfolio;
