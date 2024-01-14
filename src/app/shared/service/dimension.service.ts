import { Injectable } from '@angular/core';
import { Dimension } from '@shared/state/display.state';

@Injectable({
  providedIn: 'root',
})
export class DimensionService {
  public createDimension(element: Element): Dimension {
    const rect = element.getBoundingClientRect();
    const computedStyles = window.getComputedStyle(element);
    return {
      x: this.calculateX(rect, computedStyles),
      y: this.calculateY(rect, computedStyles),
      right: this.calculateRight(rect, computedStyles),
      bottom: this.calculateBottom(rect, computedStyles),
      height: this.calculateHeight(rect, computedStyles),
      width: this.calculateWidth(rect, computedStyles),
    };
  }

  private calculateX(
    rect: DOMRect,
    computedStyles: CSSStyleDeclaration,
  ): number {
    const x = rect.x;
    const marginLeft = this.getMarginLeft(computedStyles);
    return x - marginLeft;
  }

  private calculateY(
    rect: DOMRect,
    computedStyles: CSSStyleDeclaration,
  ): number {
    const y = rect.y;
    const marginTop = this.getMarginTop(computedStyles);
    return y - marginTop;
  }

  private calculateRight(
    rect: DOMRect,
    computedStyles: CSSStyleDeclaration,
  ): number {
    const right = rect.right;
    const marginRight = this.getMarginRight(computedStyles);
    return right + marginRight;
  }

  private calculateBottom(
    rect: DOMRect,
    computedStyles: CSSStyleDeclaration,
  ): number {
    const bottom = rect.bottom;
    const marginBottom = this.getMarginBottom(computedStyles);
    return bottom + marginBottom;
  }

  private calculateHeight(
    rect: DOMRect,
    computedStyles: CSSStyleDeclaration,
  ): number {
    const height = rect.height;
    const marginTop = this.getMarginTop(computedStyles);
    const marginBottom = this.getMarginBottom(computedStyles);
    return height + marginTop + marginBottom;
  }

  private calculateWidth(
    rect: DOMRect,
    computedStyles: CSSStyleDeclaration,
  ): number {
    const width = rect.width;
    const marginLeft = this.getMarginLeft(computedStyles);
    const marginRight = this.getMarginRight(computedStyles);
    return width + marginLeft + marginRight;
  }

  private getMarginTop(computedStyles: CSSStyleDeclaration): number {
    const marginTop = parseFloat(computedStyles.getPropertyValue('margin-top'));
    return marginTop ?? 0;
  }

  private getMarginLeft(computedStyles: CSSStyleDeclaration): number {
    const marginLeft = parseFloat(
      computedStyles.getPropertyValue('margin-left'),
    );
    return marginLeft ?? 0;
  }

  private getMarginBottom(computedStyles: CSSStyleDeclaration): number {
    const marginBottom = parseFloat(
      computedStyles.getPropertyValue('margin-bottom'),
    );
    return marginBottom ?? 0;
  }

  private getMarginRight(computedStyles: CSSStyleDeclaration): number {
    const marginRight = parseFloat(
      computedStyles.getPropertyValue('margin-right'),
    );
    return marginRight ?? 0;
  }
}
