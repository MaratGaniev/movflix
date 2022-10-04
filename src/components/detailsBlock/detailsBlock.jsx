import React from "react";

import { Facebook } from "./../decorative/icons/facebook";
import { Homepage } from "./../decorative/icons/homepage";
import { Instagram } from "./../decorative/icons/instagram";
import { JustWatch } from "./../decorative/icons/justWatch";
import { Twitter } from "./../decorative/icons/twitter";
import classes from "./detailsBlock.module.css";

export const DetailsBlock = (props) => {
  const { items, variant } = props;

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>Details</h3>
      <div
        className={
          variant === "show"
            ? `${classes.info} ${classes.forShow}`
            : classes.info
        }
      >
        <div className={classes.block}>
          <div className={classes.socials}>
            {items.ids.facebook_id ? (
              <Facebook className={classes.social} id={items.ids.facebook_id} />
            ) : null}
            {items.ids.twitter_id ? (
              <Twitter className={classes.social} id={items.ids.twitter_id} />
            ) : null}
            {items.ids.instagram_id ? (
              <Instagram
                className={classes.social}
                id={items.ids.instagram_id}
              />
            ) : null}
            {items.homepage ? (
              <Homepage className={classes.social} link={items.homepage} />
            ) : null}

            <JustWatch className={classes.social} />
          </div>

          <h3 className={classes.suptitle}>Original name</h3>
          <p className={classes.subtext}>{items.original_title}</p>

          <h3 className={classes.suptitle}>Status</h3>
          <p className={classes.subtext}>{items.status}</p>

          {items.languages !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>{"Original language(s)"}</h3>
              <p className={classes.subtext}>{items.languages}</p>
            </div>
          ) : null}

          {items.budget !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>Budget</h3>
              <p className={classes.subtext}>${items.budget}</p>
            </div>
          ) : null}

          {items.revenue !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>Revenue</h3>
              <p className={classes.subtext}>
                {items.revenue === 0
                  ? "In the box office now"
                  : `$${items.revenue}`}
              </p>
            </div>
          ) : null}

          {items.awards !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>Awards</h3>
              <p className={classes.subtext}>{items.awards}</p>
            </div>
          ) : null}
          {items.type !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>Type</h3>
              <p className={classes.subtext}>{items.type}</p>
            </div>
          ) : null}
          {items.tv_nets !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>TV Networks</h3>
              <div className={classes.networks}>
                {items.tv_nets.map((network) =>
                  network.logo_path ? (
                    <div className={classes.networkItem}>
                      <img
                        src={`https://image.tmdb.org/t/p/original${network.logo_path}`}
                        alt={""}
                        className={classes.networkImage}
                      />
                    </div>
                  ) : null
                )}
              </div>
            </div>
          ) : null}
        </div>
        <div className={classes.block}>
          <h3 className={classes.title}>Keywords</h3>
          <div className={classes.keywords}>
            {items.keywords.map((keyword) => (
              <div key={keyword.id} className={classes.keyword}>
                {keyword.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
