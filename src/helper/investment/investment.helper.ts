import { Corporations, Investments, Users } from '@ninetydays/orm-setup';
import { InternalEncrypter } from '@ninetydays/kross-utils';
import {
  GOODS_TYPE,
  INVESTMENT_STATUS,
} from '../../../src/constants/kftc.constants';

/**
 * Generates an investment register ID based on the current date and a random number.
 * The investment register ID format is: {KFTC_ORG_CODE}_{YYYYMMDD}_IR_{randomId}
 *
 * @returns The generated investment register ID.
 */
export const getInvestmentRegisterId = () => {
  const date =
    new Date().getFullYear() +
    String(new Date().getMonth() + 1).padStart(2, '0') +
    String(new Date().getDate()).padStart(2, '0');
  const randomId = Math.floor(Math.random() * 10 ** 10);
  const investmentRegisterId = `${process.env.KFTC_ORG_CODE}_${date}_IR_${String(
    randomId,
  ).padStart(10, '0')}`;

  return investmentRegisterId;
};

/**
 * Generates the payload for posting an investment register.
 *
 * @param goodId - The ID of the good.
 * @param goodType - The type of the good. Default value is `GOODS_TYPE.NOTE_MORTGAGE_LOAN`.
 * @param investment - The investment object.
 * @returns The payload for posting an investment register.
 * @throws Error if there is an error in the process.
 */
export const postInvestmentRegisterPayload = async (
  goodId: number,
  goodType = GOODS_TYPE.NOTE_MORTGAGE_LOAN,
  investment: Investments,
) => {
  try {
    const current_date = new Date()
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '');

    const investment_register_id = investment.kftcInvestmentRegisterId;

    const user = await Users.findOne({
      where: {
        id: investment.userId,
      },
    });

    const investor_info = await kftcInfo(user);

    return {
      investment_register_info: {
        investment_register_id,
        bank_inquiry_id: investment_register_id,
        investment_amount: investment.amount,
        investment_register_dtm: new Date()
          .toISOString()
          .slice(0, 16)
          .replace(/-/g, ''),
        status: INVESTMENT_STATUS.REGISTERING,
        investments_document_info: {
          document_confirm_date: current_date,
          document_type: 'DP99',
        },
      },
      investor_info,
      goods_info: { good_id: goodId, goods_type: goodType },
    };
  } catch (error) {
    throw Error(`postInvestmentRegisterPayload error: ${error.message}`);
  }
};


/**
 * Retrieves the KFTC information of a user.
 *
 * @param user - The user object.
 * @returns The KFTC information of the user.
 * @throws Error if there is an error in the process.
 */
const kftcInfo = async (user: Users) => {
  try {
    let identityNo: string;

    const internalEncryptor = new InternalEncrypter(
      process.env.INTERNAL_ENCRYPT_KEY,
    );

    if (user.isCorp) {
      const corp = await Corporations.findOne({
        where: {
          userId: user.id,
        },
      });

      if (!corp) {
        throw new Error(`Corporations not found: ${user.id}`);
      }

      identityNo = corp.corpRegNo;

    } else {
      identityNo = internalEncryptor.decrypt(user.ssn);
    }
    if (!identityNo) {
      throw new Error(`identityNo is empty / user_id: ${user.id}`);
    }

    const info = {
      identityNo,
      type: user.kftcType,
      name: internalEncryptor.decrypt(user.name),
    };

    if (isEmail(user.keyid)) {
      return info;
    } else {
      return { ...info, business_register_no: user.keyid };
    }

  } catch (error) {
    throw Error(`kftcInfo error: ${error.message}`);
  }
};

// Function to check email validation
export const isEmail = (str: string) => /^\S+@\S+\.\S+$/.test(str);
