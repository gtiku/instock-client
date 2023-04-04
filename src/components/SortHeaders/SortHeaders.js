import "./SortHeaders.scss";
import sort from "../../assets/images/Icons/sort-24px.svg";

export default function SortHeaders() {
  return (
    <section className="sort-headers">
      <article className="sort-headers__title-container">
        <h4 className="sort-headers__categories">
          INVENTORY ITEM
          <img className="sort-headers__sorticon" alt="sort icon" src={sort} />
        </h4>
      </article>
      <article className="sort-headers__title-container">
        <h4 className="sort-headers__categories">
          CATEGORY
          <img className="sort-headers__sorticon" alt="sort icon" src={sort} />
        </h4>
      </article>
      <article className="sort-headers__title-container">
        <h4 className="sort-headers__categories">
          STATUS
          <img className="sort-headers__sorticon" alt="sort icon" src={sort} />
        </h4>
      </article>
      <article className="sort-headers__title-container">
        <h4 className="sort-headers__categories">
          QUANTITY
          <img className="sort-headers__sorticon" alt="sort icon" src={sort} />
        </h4>
      </article>
      <h4 className="sort-headers__categories">ACTIONS</h4>
    </section>
  );
}
