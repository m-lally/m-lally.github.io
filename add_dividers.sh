#!/bin/bash
# Add dividers after each job section (after the job-wrapper closing div, before the next company-wrapper)

# The pattern is: after </div> (closing the job-wrapper) and before <div class="company-wrapper clearfix">
# We need to insert: <div class="section-divider"></div>

# Use sed to find the pattern and insert the divider
sed -i '' '/^            <\/div>$/,/^            <div class="company-wrapper clearfix">$/ {
  /^            <\/div>$/! {
    /^            <div class="company-wrapper clearfix">$/ i\
            <div class="section-divider"></div>\

  }
}' index.html

