import React from "react";

import { Facebook } from "./../decorative/icons/facebook";
import { Homepage } from "./../decorative/icons/homepage";
import { Instagram } from "./../decorative/icons/instagram";
import { JustWatch } from "./../decorative/icons/justWatch";
import { Twitter } from "./../decorative/icons/twitter";
import classes from "./detailsBlock.module.css";

export const DetailsBlock = (props) => {
  const { items, variant, type } = props;

  return (
    <div className={classes.wrapper}>
      <h3 className={classes.title}>
        {type === "person" ? "Personal information" : "Details"}
      </h3>
      <div
        className={
          variant === "show" || type === "person"
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

          {items.original_title !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>Original name</h3>
              <p className={classes.subtext}>{items.original_title}</p>
            </div>
          ) : null}

          {items.known_by !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>Known by</h3>
              <p className={classes.subtext}>{items.known_by}</p>
            </div>
          ) : null}
          {items.birth_day !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>Birth date</h3>
              <p className={classes.subtext}>{items.birth_day}</p>
            </div>
          ) : null}
          {items.birth_place !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>Birth place</h3>
              <p className={classes.subtext}>{items.birth_place}</p>
            </div>
          ) : null}
          {items.known_as !== undefined ? (
            <div>
              <h3 className={classes.suptitle}>Also known as</h3>
              <ul className={classes.knownAs}>
                {items.known_as.map((item) => (
                  <li>{item}</li>
                ))}
              </ul>
            </div>
          ) : null}

          {items.status !== undefined ? (
            <div>
              {" "}
              <h3 className={classes.suptitle}>Status</h3>
              <p className={classes.subtext}>{items.status}</p>
            </div>
          ) : null}

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
        {type === "person" ? null : (
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
        )}
      </div>
    </div>
  );
};
