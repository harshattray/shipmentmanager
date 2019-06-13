/**
 * @Author: harsha
 * @Date:   2019-05-02T01:51:02+05:30
 * @Last modified by:   harsha
 * @Last modified time: 2019-06-13T19:28:49+05:30
 */
import styled from "styled-components";

export default styled.div`
  .Branch {
    text-align: center;
  }
  .Branch-header {
    background-color: #222;
    height: 150px;
    padding: 20px;
    color: white;
  }
  .list-view {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #f7f7f7;
    margin-top: 20px;
    padding: 20px;
    border-radius: 8px;
  }

  .Branch-title {
    font-size: 3em;
    text-align: left;
    margin-top: 50px !important;
    font-weight: 300;
  }
  .project-container {
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  .repo-card-section {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 10px 0 0 10px;
  }
`;
