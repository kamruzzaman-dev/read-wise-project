import React from "react";
import { IoIosArrowDown } from "react-icons/io";
import { networkList } from "../../Shared/Header/Header";
import CardLayout from "../CardLayout";
import ethereum from "../../../assets/img/ethereum.svg";
import Popover from "../Popover";

const SectionCommonTable = ({
  wrapperClassName,
  cardStyle,
  sectionTableTitle,
  childComponent,
  elementOfChildcomponent,
  button,
  buttonText,
  buttonHandler,
  buttonType,
  table,
  calculateCredit,
  calculateDebit,
  calculateContainer,
}) => {
  return (
    <div className={`faucet_sectiontable_wrapper ${wrapperClassName}`}>
      <CardLayout style={cardStyle} className="faucet_sectiontable_card">
        <div className="faucet_sectiontable_title">
          <h2>{sectionTableTitle}</h2>
          {childComponent && (
            <>
              <div className="network_selector">
                <div className="network_list" ref={elementOfChildcomponent?.networkRef}>
                  <div
                    className="network_state"
                    onClick={() => elementOfChildcomponent?.setOpenNetwork(!elementOfChildcomponent?.openNetwork)}
                  >
                    <img
                      src={elementOfChildcomponent?.network?.img || ethereum}
                      width="15px"
                      height="15px"
                      alt=""
                    />
                    <span className="network_name">
                      {elementOfChildcomponent?.network?.name || "Ethereum Kovan"}
                    </span>{" "}
                    <span>
                      <IoIosArrowDown />
                    </span>
                  </div>
                  <Popover
                    openPopover={elementOfChildcomponent?.openNetwork}
                    className="network_list_popover"
                  >
                    <ul>
                      {networkList?.map((d) => (
                        <li
                          key={d.id}
                          onClick={() => {
                            elementOfChildcomponent?.setOpenNetwork(false);
                            elementOfChildcomponent?.setNetwork(d);
                          }}
                        >
                          <img src={d.img} alt="img" />
                          <p>{d.name}</p>
                        </li>
                      ))}
                    </ul>
                  </Popover>
                </div>
              </div>
            </>
          )}
          {button && (
            <button type={buttonType} onClick={buttonHandler}>
              {buttonText}
            </button>
          )}
        </div>
        <div className="faucet_sectiontable_table">{table}</div>
        {calculateContainer && (
          <div className="faucet_sectiontable_calculate">
            {calculateCredit && (
              <h2 className="credit_balance">{calculateCredit}</h2>
            )}
            {calculateDebit && (
              <h2 className="debit_balance">{calculateDebit}</h2>
            )}
          </div>
        )}
      </CardLayout>
    </div>
  );
};

export default SectionCommonTable;
