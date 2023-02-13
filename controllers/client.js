import Product from '../models/Product.js';
import ProductStat from '../models/ProductStat.js';
import Transaction from '../models/Transaction.js';
import User from '../models/User.js';
import getCountryIso3 from "country-iso-2-to-3";

// get all product
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    const productWithStats = await Promise.all(
      products.map(async (pro) => {
        const stat = await ProductStat.find({ productId: pro._id });
        return {
          ...pro._doc,
          stat,
        };
      })
    );

    res.status(200).json(productWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get all customers
export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: 'user' }).select('-password');
    res.status(200).json(customers);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get Transactions
export const getTransactions = async (req, res) => {
  try {
    const { page = 1, pageSize = 20, sort = null, search = '' } = req.query;

    const generateSort = () => {
      const sortParsed = JSON.parse(sort);
      const sortFormatted = {
        [sortParsed.field]: (sortParsed.sort = 'asc' ? 1 : -1),
      };

      return sortFormatted;
    };

    const sortFormatted = Boolean(sort) ? generateSort() : {};

    const transactions = await Transaction.find({
      $or: [
        { cost: { $regex: new RegExp(search, 'i') } },
        { userId: { $regex: new RegExp(search, 'i') } },
      ],
    })
      .sort(sortFormatted)
      .skip(page * pageSize)
      .limit(pageSize);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: 'i' },
    });

    res.status(200).json({
      transactions,
      total,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// get all geography
export const getGeography = async (req, res) => {
  try{
    const user = await User.find();
    const mappedLocations = user.reduce((acc, {country}) => {
      const countryIso3 = getCountryIso3(country);
      if(!acc[countryIso3]) {
        acc[countryIso3] = 0;
      }
      acc[countryIso3]++;

      return acc;
    }, {}) 

    const formattedLocations = Object.entries(mappedLocations).map(
      ([country, count]) => {
        return {id: country, value: count}
      }
    );

    res.status(200).json(formattedLocations);
  } catch(error) {
    res.status(404).json({message: error.message});
  }
};
 