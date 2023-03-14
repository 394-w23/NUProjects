import { describe, expect, test, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { useAuth } from "../hooks/useAuth";

vi.mock("../hooks/useAuth");

import AddModal from "../components/AddModal/AddModal";

describe("src/components/AddModal", () => {
  beforeEach(() => {
    useAuth.mockReturnValue({ displayName: "Test User" });
    render(<AddModal show={true} />);
  });

  it("renders modal 'add_modal_container'", () => {
    const modal = screen.queryByTestId("add_modal_container");
    expect(modal).toBeDefined();
  });

  it("contains title 'Create new project'", () => {
    const title = screen.queryByTestId("modal-header");
    expect(title).toBeDefined();
    expect(title.textContent).toBe("Create new project");
  });

  it("contains 1 input form", () => {
    const inputForm = screen.queryByTestId("add-modal-form");
    expect(inputForm).toBeDefined();
  });

  test("clicking button renders 'add_modal_invalid_toast' if form is invalid", () => {
    const submitButton = screen.queryByTestId("add_modal_submit_button");
    expect(submitButton).toBeDefined();

    const toast = screen.queryByTestId("add_modal_invalid_toast");
    expect(toast).toBeNull();

    fireEvent.click(submitButton);
    expect(toast).toBeDefined();
  });

  test("clicking button renders 'add_modal_invalid_toast_negative' if form has an negative input value", () => {
    const submitButton = screen.queryByTestId("add_modal_submit_button");

    const toast = screen.queryByTestId("add_modal_invalid_toast_negative");
    expect(toast).toBeNull();

    const formInputTestIds = [
      { testId: "add_modal_project_name", value: "Test name" },
      { testId: "add_modal_type_of_project", value: "Test type" },
      { testId: "add_modal_position_name", value: "Test position" },
      { testId: "add_modal_deadline", value: "Test date" },
      { testId: "add_modal_start_date", value: "Test date" },
      { testId: "add_modal_end_date", value: "Test date" },
      { testId: "add_modal_no_people", value: -100 },
      { testId: "add_modal_wage", value: -100 },
      { testId: "add_modal_description", value: "Test description" },
      { testId: "add_modal_skills", value: ["Test skill 1", "Test skill 2"] },
    ];
    formInputTestIds.forEach(({ testId, value }) => {
      const element = screen.queryByTestId(testId);
      fireEvent.change(element, { target: { value: value } });
    });

    fireEvent.click(submitButton);
    expect(toast).toBeDefined();
  });
});
