# brown

### How to clone
`git clone --recurse-submodules git@github.com:ele-one/brown.git`

or

#### Steps
- `git clone <your_forked_repo>`
- `git remote add upstream git@github.com:ele-one/brown.git`
- (verify this) `git submodule add <your_forked_brown> (to get the brown folder)`
-  `git remote add upstream git@github.com:ele-one/brown.git`
- `git submodule init`
- `git submodule update --remote`
- `git status`
- `git push origin master --recurse-submodules=check` (safer - can also do regular git pull/push)
- 

