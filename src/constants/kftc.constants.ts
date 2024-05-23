exports.INVESTOR_TYPE = {
  PERSONAL: "I110", // 일반개인투자자
  PERSONAL_ELIGIBLE_INCOME: "I120", // 소득적격투자자 개인
  PERSONAL_PRO_INVESTOR: "I130", // 개인전문투자자
  CORPORATE: "I310", // 법인투자자
  CORPORATE_BANK: "I320", // 여신금융기관 법인
  CORPORATE_P2P: "I330", // P2P온투업자
};

exports.BORROWER_TYPE = {
  PERSONAL_NORMAL: "B100", // 개인
  PERSONAL_BUSINESS: "B200", // 개인사업자
  CORPORATE: "B300", // 법인
};

export const GOODS_TYPE = {
  REAL_ESTATE_PF_LOAN: "P110", // 부동산 프로젝트파이낸싱 연계대출 상품
  REAL_ESTATE_MORTGAGE_LOAN: "P120", // 부동산 담보 연계대출 상품
  NOTE_MORTGAGE_LOAN: "P210", // 어음·매출채권 담보 연계대출 상품
  OTHER_MORTGAGE_LOAN: "P220", // 기타 담보 연계대출 상품(어음·매출채권 제외)
  PERSONAL_CREDIT_LOAN: "P230", // 개인 신용 연계대출 상품
  CORPORATE_CREDIT_LOAN: "P240", // 법인 신용 연계대출 상품
  ALL: "P000", // 전체 상품
};


export const INVESTMENT_STATUS = {
  REGISTERING: "T100", // 신청 중
  REGISTER_CANCELD: "T150", // 신청 취소
  REGISTER_COMPLETE: "T300", // 신청 완료 for migrations
  CONTRACT_REPAYING: "S100", // 계약 - 상환 중
  CONTRACT_OVERDUE: "S150", // 계약 – 연체 중
  CONTRACT_REPAID_OK: "S301", // 계약 – 상환완료(정상)
  CONTRACT_REPAID_TRANSFERRED: "S302", // 투자계약 – 상환완료(양도)
  CONTRACT_REPAID_OTHER: "S303", // 계약 – 상환완료(기타)
  CONTRACT_REPAID_BANKRUPTED: "S304", // 계약 – 상환완료(부실처리)
  CONTRACT_RELEASED: "S311", // 계약 – 계약의 해제
  CONTRACT_TERMINATED: "S312", // 계약 – 계약의 해지
};

exports.GOODS_STATUS = {
  CANCELED: "T150", // 상품모집 취소
  INVESTING: "T200", // 모집 중
  INVESTED: "T210", // 모집 완료
  REGISTER_COMPLETE: "T300", // 신청 완료 for migrations
  REPAYING: "S100", // 상환 중
  OVERDUE: "S150", // 연체 중
  REPAID: "S301", // 상환완료
};

exports.REPAYMENT_TYPE = {
  NORMAL: "RP00",
  EARLY: "RP10",
  LATE: "RP90",
};

export const CATEGORY_TO_LOAN_TYPE = {
  SCF: GOODS_TYPE.NOTE_MORTGAGE_LOAN,
  CC: GOODS_TYPE.CORPORATE_CREDIT_LOAN,
  ETC: GOODS_TYPE.OTHER_MORTGAGE_LOAN,
  EB: GOODS_TYPE.NOTE_MORTGAGE_LOAN,
  FF: GOODS_TYPE.NOTE_MORTGAGE_LOAN,
};
