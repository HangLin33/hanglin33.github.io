//
//  main.js
//  portfolio
//
//  Created by Foxster on 2022-09-23.
//  Copyright (c) 2022 Foxster. All rights reserved.
//

import { $, $$ } from "./lib.js";
import { Tile } from "./components/Tile.js";
import { refreshAppearance } from "./appearance.js";

// Load data
fetchJSON("assets/data.json").then(data => {
    // 1. Greeting
    if ($("#greeting h1")) $("#greeting h1").innerText = data.greeting.heading;
    if ($("#greeting p")) $("#greeting p").innerText = data.greeting.description;

    // 2. Introduction
    if ($("#intro .tile h2")) $("#intro .tile h2").innerHTML = data.intro.heading;
    
    const introOverlay = $("#intro .tile-overlay div>p");
    if (introOverlay) {
        data.intro.description.split("\n").forEach(line =>
            introOverlay.insertAdjacentHTML("beforeend", `<p>${line}</p>`)
        );
    }

    const timelineRow = $("#timeline>.row");
    if (timelineRow) {
        data.intro.timeline.forEach(milestone => {
            timelineRow.insertAdjacentHTML("beforeend", `
                <div class="col-md-4 col-lg-4 p-4">
                  <div class="d-flex flex-column align-items-center text-center gap-3 px-3">
                    <img src="${milestone.img}" alt="${milestone.img.split(".") + "-logo"}" class="app-icon">
                    <p>
                      <span class="fw-kinda-bold">${milestone.title}</span><br>
                      <span>${milestone.subtitle}</span><br>
                      <span class="text-matte-light">${milestone.date}</span><br>
                    </p>
                  </div>
                </div>
            `);
        });
    }

    // 3. Skills 渲染 (确保在 Projects 之前)
    const rows = $$(".technologies-row");
    const languages = ["python", "sql", "r", "matlab", "stata"]; 
    const technologies = ["bloomberg", "capitaliq", "factset", "dealogic"];
    const tools = ["excel", "powerpoint", "word", "tableau"];

    const renderRow = (rowElement, items) => {
        if (!rowElement) return;
        const content = items.map(item => `<img src="assets/img/technology-icons/${item}.png" alt="${item}">`).join('');
        // 复制三份确保滚动无缝
        rowElement.innerHTML = `<div class="scroll-track">${content}${content}${content}</div>`;
    };

    if (rows.length >= 3) {
        renderRow(rows[0], languages);
        renderRow(rows[1], technologies);
        renderRow(rows[2], tools);
    }

    // 4. Projects 逻辑
    let projectTiles = [];
    if (data.projects && data.projects.list) {
        data.projects.list.forEach(project => {
            let customCoverDescriptionHTML = `
            <a target="_blank" href="${project.custom_url ?? "https://github.com/" + data.github_username + "/" + project.heading}" class="fs-6 link-primary d-block" style="margin-top: 4px; margin-bottom: 10px; width: fit-content;">
                <span class="link-text fw-normal">${project.custom_url_text ?? "View on GitHub"}</span>
                <i class="bi bi-chevron-right"></i>
            </a>
            <p>`;
            project.topics?.forEach(topic => {
                customCoverDescriptionHTML += `<span class="topic-badge m-1" style="color:${data.projects.color}; border-color: ${data.projects.color};">${topic}</span>`;
            });
            customCoverDescriptionHTML += `</p>`;
            
            projectTiles.push(Tile(project, data.projects.color, data.projects.muted_color, customCoverDescriptionHTML));
        });
    }

    const projectsContainer = $("#projects .row");
    if (projectsContainer) {
        projectTiles.forEach(tile => projectsContainer.insertAdjacentHTML("beforeend", tile));
    }

    // 5. Socials
    const socialsContainer = $("#contact #socials-container");
    if (socialsContainer) {
        data.socials.forEach(item => {
            const username = item.username_prefix ? `${item.username_prefix}${item.username}` : item.username;
            socialsContainer.insertAdjacentHTML("beforeend", `
                <a href="https://www.${item.platform}.com/${username}" target="_blank" class="social-link text-light d-flex flex-row align-items-center m-1">
                    <img src="assets/img/app-icons/app-icon-${item.platform}.png" alt="${item.platform}-icon" class="app-icon m-2">
                    ${item.username_prefix ? username : "@" + item.username}
                </a>
            `);
        });
    }

    refreshAppearance();
}).catch(error => console.error("Error loading data:", error));

async function fetchJSON(url) {
    const response = await fetch(url, {
        method: "GET",
        mode: "cors",
        headers: { "Content-Type": "application/json" }
    });
    return await response.json();
}

window.requestResume = function () {
    const contactSection = $("#contact");
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        const checkbox = $("#contact .plus-go-x>input");
        const message = $("#contact #message");
        if (message) message.value = "Hello, I'd like to take a look at your resume.";
        if (checkbox && !checkbox.checked) {
            checkbox.checked = true;
            checkbox.dispatchEvent(new Event("change"));
        }
    }
}
